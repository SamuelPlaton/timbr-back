import { Injectable } from '@nestjs/common';
import { AuditItem } from '../../../../entities';
import { CompanyInformation } from '../../../../types/company-information.type';
import { AuditConfigItem, BaseAuditGenerator } from './base.generator';
import microConfig from '../config/audit-config.micro';

// 2024 thresholds — TODO: update annually
const RFR_PL_THRESHOLD_PER_PART = 27478; // Max RFR N-2 per fiscal part to opt for prélèvement libératoire
const MICRO_CA_CEILING_SERVICES = 77700; // Micro-entreprise CA ceiling — prestations de services (BNC/BIC)
const MICRO_CA_CEILING_GOODS = 188700; // Micro-entreprise CA ceiling — ventes de marchandises (BIC)
const ABATTEMENT_EXPENSES_THRESHOLD = 10000; // Proxy above which frais réels may exceed the flat abattement
const SOCIETE_CONSIDERATION_CA = 50000; // CA above which a Micro → SASU/EURL comparison becomes worthwhile
const COMPTE_BANCAIRE_CA_THRESHOLD = 10000; // CA above which a dedicated account becomes legally required (after 2 years)

@Injectable()
export class MicroAuditGenerator extends BaseAuditGenerator {
  protected readonly config: AuditConfigItem[] = microConfig;

  generate(companyInfo: CompanyInformation): Partial<AuditItem>[] {
    return [
      ...this.checkTNS(companyInfo),
      ...this.checkFiscalite(companyInfo),
      ...this.checkTVA(companyInfo),
      ...this.checkSimulation(companyInfo),
      ...this.checkRetraite(companyInfo),
      ...this.checkAdministratif(companyInfo),
    ];
  }

  // ── TNS ───────────────────────────────────────────────────────────────

  private checkTNS(companyInfo: CompanyInformation): Partial<AuditItem>[] {
    const rfr = companyInfo.rfr_n_minus_2 || 0;
    const taxParts = companyInfo.tax_parts || 1;

    // TODO: verify — Prélèvement libératoire (PL) eligibility: if RFR N-2 per fiscal part
    // exceeds 27,478€, the entrepreneur cannot opt for the simplified PL regime and must
    // pay income tax via the progressive barème instead.
    if (rfr / taxParts > RFR_PL_THRESHOLD_PER_PART) {
      return [this.createItem('tns_tva_liberation_eligible_danger')];
    }

    // TODO: verify — ACRE guide: shown when the entrepreneur is eligible for ACRE
    // (social charge reduction for the first 12 months). Typically applies to new
    // registrations. Trigger: has_acre flag or creation_date within the current year.
    return [this.createItem('tns_tva_guide_accre')];
  }

  // ── Fiscalité ─────────────────────────────────────────────────────────

  private checkFiscalite(companyInfo: CompanyInformation): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    const rfr = companyInfo.rfr_n_minus_2 || 0;
    const taxParts = companyInfo.tax_parts || 1;
    const ca = companyInfo.ca_history_n || 0;
    const caThreshold =
      companyInfo.bic_bnc_type === 'BIC' ? MICRO_CA_CEILING_GOODS : MICRO_CA_CEILING_SERVICES;

    // TODO: verify — Prélèvement libératoire eligibility: same RFR check as TNS block,
    // surfaces the fiscal impact and actionable next steps.
    if (rfr / taxParts > RFR_PL_THRESHOLD_PER_PART) {
      items.push(this.createItem('fiscalite_prelevements_liberatoires_danger'));
    } else {
      items.push(this.createItem('fiscalite_prelevements_acces_eligible'));

      // TODO: verify — Calcul des gains: rough estimation of the annual saving from
      // using PL vs the progressive barème. Replace 500 with a real calculation based
      // on (rfr × marginal_rate) - (ca × taux_pl).
      const estimatedSavings = 500; // TODO: compute from actual RFR and PL rates
      items.push(
        this.createItem('fiscalite_prelevements_calcul_gains', { savings: estimatedSavings }),
      );
    }

    // TODO: verify — URSSAF declaration: shown to all micro-entrepreneurs as quarterly
    // (or monthly) URSSAF declarations are mandatory and frequently missed.
    items.push(this.createItem('fiscalite_urssaf_declaration'));

    // TODO: verify — Abattement / frais réels: shown when declared professional expenses
    // may exceed the micro-enterprise flat-rate deduction (34% BNC, 50% BIC services,
    // 71% BIC goods). A frais réels switch via a société could yield a better outcome.
    const professionalExpenses = companyInfo.professional_expenses_est || 0;
    if (professionalExpenses > ABATTEMENT_EXPENSES_THRESHOLD) {
      items.push(
        this.createItem('fiscalite_reductions_entreprise_orange', {
          professional_expenses: professionalExpenses,
        }),
      );
    }

    // TODO: verify — Plafond cotisations: shown when CA approaches the micro-enterprise
    // ceiling (85% of threshold used here as early warning). Exceeding it triggers a
    // mandatory regime change with significantly higher obligations.
    if (ca > caThreshold * 0.85) {
      items.push(this.createItem('fiscalite_plafonds_cotisations'));
    }

    return items;
  }

  // ── TVA ───────────────────────────────────────────────────────────────

  private checkTVA(companyInfo: CompanyInformation): Partial<AuditItem>[] {
    // Educational — always shown. The confusion between TVA franchise seuil (36,800€)
    // and micro-enterprise CA ceiling (77,700€) is one of the most common mistakes.
    return [this.createItem('micro_seuil_tva_franchise')];
  }

  // ── Simulation / Structure ────────────────────────────────────────────

  private checkSimulation(companyInfo: CompanyInformation): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    const ca = companyInfo.ca_history_n || 0;
    const caThreshold =
      companyInfo.bic_bnc_type === 'BIC' ? MICRO_CA_CEILING_GOODS : MICRO_CA_CEILING_SERVICES;

    // TODO: verify — Versement libératoire: shown when the entrepreneur has opted into
    // prélèvement libératoire (fiscal_liberatoire = true). Reminder about payment
    // schedule and consequences of late declarations.
    if (companyInfo.fiscal_liberatoire) {
      items.push(this.createItem('simulation_micro_entreprise_versements'));
    }

    // TODO: verify — Statut adéquat: shown when CA is clearly below the micro ceiling,
    // confirming the micro-enterprise status is optimal for their current activity level.
    if (ca < caThreshold) {
      items.push(this.createItem('simulation_micro_entreprise_status'));
    }

    // TODO: verify — Transition vers société: shown when CA is growing and exceeds
    // SOCIETE_CONSIDERATION_CA. At this level, a Micro vs SASU/EURL comparison becomes
    // financially meaningful and should be triggered proactively.
    if (ca > SOCIETE_CONSIDERATION_CA) {
      items.push(this.createItem('micro_transition_vers_societe'));
    }

    return items;
  }

  // ── Retraite ──────────────────────────────────────────────────────────

  private checkRetraite(companyInfo: CompanyInformation): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    const ca = companyInfo.ca_history_n || 0;

    // TODO: verify — Retraite zéro CA: shown when CA is very low (below the approximate
    // minimum needed to validate at least 1 trimestre for the year). In micro, no CA = no
    // retraite cotisations. This is a critical and often unknown trap.
    // Rough minimum: ~5,700€ CA annuel for BNC to validate 4 trimestres.
    const RETRAITE_MIN_CA_BNC = 5700;
    const RETRAITE_MIN_CA_BIC = 4600;
    const retraiteMinCA =
      companyInfo.bic_bnc_type === 'BIC' ? RETRAITE_MIN_CA_BIC : RETRAITE_MIN_CA_BNC;
    if (ca < retraiteMinCA) {
      items.push(this.createItem('micro_retraite_zero_ca_risque'));
    }

    // TODO: verify — PER épargne retraite: shown when entrepreneur has meaningful income
    // (in the 30% TMI or above). Below this bracket, the PER tax benefit is limited.
    const rfr = companyInfo.rfr_n_minus_2 || 0;
    const taxParts = companyInfo.tax_parts || 1;
    const TMI_30_THRESHOLD = 28797; // 2024 — 30% bracket start per fiscal part
    if (rfr / taxParts > TMI_30_THRESHOLD) {
      items.push(this.createItem('micro_per_epargne_retraite'));
    }

    return items;
  }

  // ── Administratif ─────────────────────────────────────────────────────

  private checkAdministratif(companyInfo: CompanyInformation): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // TODO: verify — CFE cotisation: shown to all micro-entrepreneurs from year 2 onward
    // as an early warning. Trigger: creation_date is more than 1 year ago.
    const creationDate = companyInfo.creation_date ?? '';
    const creationYear = creationDate ? new Date(creationDate).getFullYear() : null;
    const currentYear = new Date().getFullYear();
    if (creationYear !== null && creationYear < currentYear) {
      items.push(this.createItem('micro_cfe_cotisation_annuelle'));
    }

    // TODO: verify — Compte bancaire dédié: shown as early advice for all, and as
    // a compliance warning if CA exceeds 10,000€ (legally required after 2 consecutive years).
    const ca = companyInfo.ca_history_n || 0;
    if (ca > COMPTE_BANCAIRE_CA_THRESHOLD) {
      items.push(this.createItem('micro_compte_bancaire_dedie'));
    }

    return items;
  }
}
