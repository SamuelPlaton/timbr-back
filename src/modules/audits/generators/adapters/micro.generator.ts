import { Injectable } from '@nestjs/common';
import { AuditItem } from '../../../../entities';
import { BicBncType } from '../../../../types/company-information.type';
import { AuditContext } from '../audit-context.type';
import { AuditConfigItem, BaseAuditGenerator } from './base.generator';
import microConfig from '../config/audit-config.micro';

// 2026 thresholds
const RFR_PL_THRESHOLD_PER_PART = 28797; // Max RFR N-2 per fiscal part to opt for prélèvement libératoire
const MICRO_CA_CEILING_SERVICES = 77700; // Micro-entreprise CA ceiling — prestations de services (BNC/BIC)
const MICRO_CA_CEILING_GOODS = 188700; // Micro-entreprise CA ceiling — ventes de marchandises (BIC)
const ABATTEMENT_EXPENSES_THRESHOLD = 10000; // Proxy above which frais réels may exceed the flat abattement
const SOCIETE_CONSIDERATION_CA = 50000; // CA above which a Micro → SASU/EURL comparison becomes worthwhile
const COMPTE_BANCAIRE_CA_THRESHOLD = 10000; // CA above which a dedicated account becomes legally required (after 2 years)

@Injectable()
export class MicroAuditGenerator extends BaseAuditGenerator {
  protected readonly config: AuditConfigItem[] = microConfig;

  generate(ctx: AuditContext): Partial<AuditItem>[] {
    return [
      ...this.checkTNS(ctx),
      ...this.checkFiscalite(ctx),
      ...this.checkTVA(ctx),
      ...this.checkSimulation(ctx),
      ...this.checkRetraite(ctx),
      ...this.checkAdministratif(ctx),
    ];
  }

  // ── TNS ───────────────────────────────────────────────────────────────

  private checkTNS(ctx: AuditContext): Partial<AuditItem>[] {
    // ACRE eligibility check: shown only when the entrepreneur has NOT already
    // requested ACRE. If has_acre = true, they are already benefiting — no need
    // to prompt them. PL eligibility (RFR check) is handled separately in checkFiscalite.
    if (!ctx.onboarding.micro?.has_acre) {
      return [this.createItem('tns_tva_guide_accre')];
    }

    return [];
  }

  // ── Fiscalité ─────────────────────────────────────────────────────────

  private checkFiscalite(ctx: AuditContext): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    const micro = ctx.onboarding.micro;
    const ca = micro?.ca_history_n ?? 0;
    const caThreshold =
      ctx.bic_bnc_type === BicBncType.BUY_SELL
        ? MICRO_CA_CEILING_GOODS
        : MICRO_CA_CEILING_SERVICES;

    // Prélèvement libératoire eligibility: same RFR check as TNS block,
    // surfaces the fiscal impact and actionable next steps.
    const rfr = ctx.onboarding.micro?.rfr_n_minus_2 ?? 0;
    if (rfr / ctx.tax_parts > RFR_PL_THRESHOLD_PER_PART) {
      items.push(this.createItem('fiscalite_prelevements_liberatoires_danger'));
    } else {
      items.push(this.createItem('fiscalite_prelevements_acces_eligible'));

      // Real PL savings computation using actual CA, bic_bnc_type and abattement.
      // Eligible PL implies rfr/parts ≤ threshold → max applicable TMI is 11%.
      const bicBncType = ctx.bic_bnc_type ?? BicBncType.BNC;
      const abattementRate =
        bicBncType === BicBncType.BUY_SELL
          ? 0.71
          : bicBncType === BicBncType.BIC
            ? 0.5
            : 0.34;
      const plRate =
        bicBncType === BicBncType.BUY_SELL
          ? 0.01
          : bicBncType === BicBncType.BIC
            ? 0.017
            : 0.022;
      const abattementDisplay =
        bicBncType === BicBncType.BUY_SELL
          ? '71'
          : bicBncType === BicBncType.BIC
            ? '50'
            : '34';
      const plRateDisplay =
        bicBncType === BicBncType.BUY_SELL
          ? '1'
          : bicBncType === BicBncType.BIC
            ? '1,7'
            : '2,2';
      const incomeImposable = Math.round(ca * (1 - abattementRate));
      const irPl = Math.round(ca * plRate);
      const irBareme = Math.round(incomeImposable * 0.11);
      const savings = Math.max(0, irBareme - irPl);
      items.push(
        this.createItem('fiscalite_prelevements_calcul_gains', {
          ca,
          abattement_display: abattementDisplay,
          income_imposable: incomeImposable,
          pl_rate_display: plRateDisplay,
          ir_pl: irPl,
          ir_bareme: irBareme,
          savings,
        }),
      );
    }

    // URSSAF declaration: shown to all micro-entrepreneurs as quarterly
    // (or monthly) URSSAF declarations are mandatory and frequently missed.
    items.push(this.createItem('fiscalite_urssaf_declaration'));

    // Abattement / frais réels: shown when declared professional expenses
    // may exceed the micro-enterprise flat-rate deduction (34% BNC, 50% BIC services,
    // 71% BIC goods). A frais réels switch via a société could yield a better outcome.
    const professionalExpenses = micro?.professional_expenses_est ?? 0;
    if (professionalExpenses > ABATTEMENT_EXPENSES_THRESHOLD) {
      items.push(
        this.createItem('fiscalite_reductions_entreprise_orange', {
          professional_expenses: professionalExpenses,
        }),
      );
    }

    // Abattement explication: educational card — always shown to help
    // micro-entrepreneurs understand how they will be taxed without PL.
    {
      const bicBncTypeForAbattement = ctx.bic_bnc_type ?? BicBncType.BNC;
      const abattementRateForDisplay =
        bicBncTypeForAbattement === BicBncType.BUY_SELL
          ? 0.71
          : bicBncTypeForAbattement === BicBncType.BIC
            ? 0.5
            : 0.34;
      const abattementDisplayForCard =
        bicBncTypeForAbattement === BicBncType.BUY_SELL
          ? '71'
          : bicBncTypeForAbattement === BicBncType.BIC
            ? '50'
            : '34';
      const activiteTypeForCard =
        bicBncTypeForAbattement === BicBncType.BUY_SELL
          ? 'BIC ventes de marchandises'
          : bicBncTypeForAbattement === BicBncType.BIC
            ? 'BIC services'
            : 'BNC';
      items.push(
        this.createItem('micro_abattement_explication', {
          ca,
          activite_type: activiteTypeForCard,
          abattement_display: abattementDisplayForCard,
          revenu_imposable: Math.round(ca * (1 - abattementRateForDisplay)),
        }),
      );
    }

    // Plafond cotisations: shown when CA approaches the micro-enterprise
    // ceiling (85% of threshold used here as early warning). Exceeding it triggers a
    // mandatory regime change with significantly higher obligations.
    if (ca > caThreshold * 0.85) {
      items.push(
        this.createItem('fiscalite_plafonds_cotisations', {
          ca,
          ca_threshold: caThreshold,
        }),
      );
    }

    return items;
  }

  // ── TVA ───────────────────────────────────────────────────────────────

  private checkTVA(ctx: AuditContext): Partial<AuditItem>[] {
    const ca = ctx.onboarding.micro?.ca_history_n ?? 0;
    const isBuySell = ctx.bic_bnc_type === BicBncType.BUY_SELL;
    const tvaSeuil = isBuySell ? 91900 : 36800;
    const tvaMajore = isBuySell ? 101000 : 39100;
    const caRestant = Math.max(0, tvaSeuil - ca);

    return [
      this.createItem('micro_seuil_tva_franchise', {
        ca,
        tva_seuil_base: tvaSeuil,
        tva_seuil_majore: tvaMajore,
        ca_restant: caRestant,
      }),
    ];
  }

  // ── Simulation / Structure ────────────────────────────────────────────

  private checkSimulation(ctx: AuditContext): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    const micro = ctx.onboarding.micro;
    const ca = micro?.ca_history_n ?? 0;
    const caThreshold =
      ctx.bic_bnc_type === BicBncType.BUY_SELL
        ? MICRO_CA_CEILING_GOODS
        : MICRO_CA_CEILING_SERVICES;

    // Statut adéquat: shown when CA is clearly below the micro ceiling,
    // confirming the micro-enterprise status is optimal for their current activity level.
    if (ca < caThreshold) {
      items.push(this.createItem('simulation_micro_entreprise_status'));
    }

    // Transition vers société: shown when CA is growing and exceeds
    // SOCIETE_CONSIDERATION_CA. At this level, a Micro vs SASU/EURL comparison becomes
    // financially meaningful and should be triggered proactively.
    if (ca > SOCIETE_CONSIDERATION_CA) {
      const bicBncType = ctx.bic_bnc_type ?? BicBncType.BNC;
      const cotisationRate =
        bicBncType === BicBncType.BUY_SELL
          ? 0.062
          : bicBncType === BicBncType.BIC
            ? 0.123
            : 0.212;
      const cotisationRateDisplay =
        bicBncType === BicBncType.BUY_SELL
          ? '6,2'
          : bicBncType === BicBncType.BIC
            ? '12,3'
            : '21,2';
      const abattementDisplay =
        bicBncType === BicBncType.BUY_SELL
          ? '71'
          : bicBncType === BicBncType.BIC
            ? '50'
            : '34';
      const activiteType =
        bicBncType === BicBncType.BUY_SELL
          ? 'BIC ventes de marchandises'
          : bicBncType === BicBncType.BIC
            ? 'BIC services'
            : 'BNC';
      const cotisationsMicro = Math.round(ca * cotisationRate);
      const salaireSasuExemple = Math.round(ca * 0.4);
      const cotisationsSasu = Math.round(salaireSasuExemple * 0.75);
      const resteSociete = ca - salaireSasuExemple;
      items.push(
        this.createItem('micro_transition_vers_societe', {
          ca,
          activite_type: activiteType,
          cotisation_rate_display: cotisationRateDisplay,
          abattement_display: abattementDisplay,
          cotisations_micro: cotisationsMicro,
          salaire_sasu_exemple: salaireSasuExemple,
          cotisations_sasu: cotisationsSasu,
          reste_societe: resteSociete,
          ca_plafond: caThreshold,
        }),
      );
    }

    return items;
  }

  // ── Retraite ──────────────────────────────────────────────────────────

  private checkRetraite(ctx: AuditContext): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    const ca = ctx.onboarding.micro?.ca_history_n ?? 0;

    // Retraite zéro CA: shown when CA is below the minimum needed to validate
    // 4 trimestres for the year. In micro, no CA = no retraite cotisations.
    const RETRAITE_MIN_CA_BUY_SELL = 24115; // 4 trimestres — BIC ventes de marchandises
    const RETRAITE_MIN_CA_BIC = 13992; // 4 trimestres — BIC services
    const RETRAITE_MIN_CA_BNC = 10850; // 4 trimestres — BNC professions libérales
    const retraiteMinCA =
      ctx.bic_bnc_type === BicBncType.BUY_SELL
        ? RETRAITE_MIN_CA_BUY_SELL
        : ctx.bic_bnc_type === BicBncType.BIC
          ? RETRAITE_MIN_CA_BIC
          : RETRAITE_MIN_CA_BNC;
    if (ca < retraiteMinCA) {
      items.push(
        this.createItem('micro_retraite_zero_ca_risque', {
          ca,
          retraite_min_ca: retraiteMinCA,
        }),
      );
    }

    // PER épargne retraite: shown when entrepreneur has meaningful income
    // (in the 30% TMI or above). Below this bracket, the PER tax benefit is limited.
    const TMI_30_THRESHOLD = 28797; // 2024 — 30% bracket start per fiscal part
    if (ctx.taxable_yearly_income / ctx.tax_parts > TMI_30_THRESHOLD) {
      items.push(this.createItem('micro_per_epargne_retraite'));
    }

    return items;
  }

  // ── Administratif ─────────────────────────────────────────────────────

  private checkAdministratif(ctx: AuditContext): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // TODO: verify — CFE cotisation: shown to all micro-entrepreneurs from year 2 onward
    // as an early warning. Trigger: creation_date is more than 1 year ago.
    const creationYear = ctx.creation_date
      ? new Date(ctx.creation_date).getFullYear()
      : null;
    const currentYear = new Date().getFullYear();
    if (creationYear !== null && creationYear < currentYear) {
      items.push(this.createItem('micro_cfe_cotisation_annuelle'));
    }

    // TODO: verify — Compte bancaire dédié: shown as early advice for all, and as
    // a compliance warning if CA exceeds 10,000€ (legally required after 2 consecutive years).
    const ca = ctx.onboarding.micro?.ca_history_n ?? 0;
    if (ca > COMPTE_BANCAIRE_CA_THRESHOLD) {
      items.push(this.createItem('micro_compte_bancaire_dedie'));
    }

    return items;
  }
}
