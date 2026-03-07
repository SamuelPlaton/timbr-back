import { Injectable } from '@nestjs/common';
import { AuditItem } from '../../../../entities';
import {
  LegalForm,
  ProfessionalSituation,
} from '../../../../types/company-information.type';
import { AuditContext } from '../audit-context.type';
import { AuditConfigItem, BaseAuditGenerator } from './base.generator';
import societeConfig from '../config/audit-config.societe';

// 2026 thresholds
const SASU_DIVIDENDES_CA_THRESHOLD = 77700; // CA above which salary + dividends mix becomes worth exploring
const TVA_FRANCHISE_THRESHOLD = 36800; // Franchise en base de TVA ceiling — prestations de services
const HOLDING_CA_THRESHOLD = 80000; // CA above which a holding structure becomes worth exploring
const RETRAITE_QUARTERLY_VALIDATION_SALARY = 1803; // Minimum quarterly earnings to validate 1 trimestre
const TMI_30_THRESHOLD_PER_PART = 29580; // 2026 — 30% bracket start per fiscal part

@Injectable()
export class SocieteAuditGenerator extends BaseAuditGenerator {
  protected readonly config: AuditConfigItem[] = societeConfig;

  generate(ctx: AuditContext): Partial<AuditItem>[] {
    return [
      ...this.checkSocial(ctx),
      ...this.checkAcre(ctx),
      ...this.checkRetraite(ctx),
      ...this.checkDemission(ctx),
      ...this.checkARE(ctx),
      ...this.checkAGE(ctx),
      ...this.checkTVA(ctx),
      ...this.checkFiscalite(ctx),
      ...this.checkPatrimoine(ctx),
    ];
  }

  private isSasuOrSas(ctx: AuditContext): boolean {
    const form = ctx.onboarding.societe?.legal_form;
    return form === LegalForm.SASU || form === LegalForm.SAS;
  }

  private isEurlOrSarl(ctx: AuditContext): boolean {
    const form = ctx.onboarding.societe?.legal_form;
    return form === LegalForm.EURL || form === LegalForm.SARL;
  }

  private isPreviouslyEmployed(ctx: AuditContext): boolean {
    const ps = ctx.onboarding.societe?.previous_professional_situation ?? null;
    return (
      ps === ProfessionalSituation.EMPLOYEE ||
      ps === ProfessionalSituation.UNEMPLOYED_COMPENSATED
    );
  }

  // ── Social ────────────────────────────────────────────────────────────

  private checkSocial(ctx: AuditContext): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];
    const societe = ctx.onboarding.societe;
    const ca = societe?.ca_est_n ?? 0;
    const monthlySalary = societe?.monthly_salary ?? 0;
    const estimatedRevenue = monthlySalary * 12;

    // Protection sociale SASU/SAS: assimilé-salarié status with full
    // employee-equivalent social protection (health, retirement, disability).
    if (this.isSasuOrSas(ctx)) {
      items.push(this.createItem('social_sas_sasu_protection_sociale'));
    }

    // Statut TNS EURL/SARL: gérant majoritaire — lower charges but
    // fundamentally different protection from SASU.
    if (this.isEurlOrSarl(ctx)) {
      items.push(this.createItem('societe_eurl_sarl_statut_tns'));
    }

    // Estimation revenus: shown when a salary is being drawn, to inform
    // the entrepreneur of their estimated gross annual income and charges.
    if (estimatedRevenue > 0) {
      items.push(
        this.createItem('social_rapport_estimation_revenus', {
          monthly_salary: monthlySalary,
          estimated_revenue: estimatedRevenue,
        }),
      );
    }

    // Optimisation rémunération: salary vs dividends question arises at
    // any income level and requires guidance.
    items.push(this.createItem('societe_optimisation_remuneration'));

    // Dividendes SASU: when SASU generates meaningful revenue, making a
    // salary + dividends mix worth exploring. Dividends in SASU are subject
    // to flat tax (30%) with no additional social charges.
    if (this.isSasuOrSas(ctx) && ca > SASU_DIVIDENDES_CA_THRESHOLD) {
      items.push(this.createItem('social_sasu_dividendes'));
    }

    return items;
  }

  // ── ACRE ────────────────────────────────────────────────────────────
  private checkAcre(ctx: AuditContext): Partial<AuditItem>[] {
    // ACRE eligibility: shown when the entrepreneur has NOT already requested
    // ACRE and is still within the 45-day window after immatriculation.
    // Also shown when no creation date is available (we can't rule it out).
    if (ctx.onboarding.societe?.has_acre) {
      return [];
    }

    const ACRE_DEADLINE_DAYS = 45;
    if (ctx.creation_date) {
      const creation = new Date(ctx.creation_date);
      const now = new Date();
      const diffMs = now.getTime() - creation.getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);
      if (diffDays > ACRE_DEADLINE_DAYS) {
        return [];
      }
    }

    return [this.createItem('societe_acre_eligibilite')];
  }

  // ── Retraite ──────────────────────────────────────────────────────────

  private checkRetraite(ctx: AuditContext): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];
    const monthlySalary = ctx.onboarding.societe?.monthly_salary ?? 0;
    const annualSalary = monthlySalary * 12;
    const minimumMonthlySalary = Math.round(
      RETRAITE_QUARTERLY_VALIDATION_SALARY / 3,
    );

    if (this.isSasuOrSas(ctx)) {
      // ARE declaration: SASU entrepreneurs who previously worked as employees
      // should verify their ARE rights before the SASU impacts the calculation.
      if (this.isPreviouslyEmployed(ctx)) {
        items.push(this.createItem('retraite_sasu_declaration_arebasee'));
      }

      // Trimestres retraite: 2024 rule — earn at least SMIC × 150h (≈ 1,747€)
      // per quarter to validate 1 trimestre. Maximum 4 trimestres per year.
      const quarters = Math.min(
        4,
        Math.floor(annualSalary / RETRAITE_QUARTERLY_VALIDATION_SALARY),
      );
      items.push(
        this.createItem('retraite_sasu_explication_trimestres', {
          monthly_salary: monthlySalary,
          quarters,
        }),
      );

      // Risque trimestres: shown when the quarterly salary is insufficient
      // to validate even 1 retraite trimestre. Minimum monthly salary ≈ 582€.
      if (monthlySalary < minimumMonthlySalary) {
        items.push(
          this.createItem('retraite_validation_prelevements_personnel', {
            minimum_salary: minimumMonthlySalary,
          }),
        );
      }

      // PER dirigeant SASU: shown when the director's salary puts them in the
      // 30%+ TMI bracket, making PER contributions highly tax-efficient.
      if (
        ctx.taxable_yearly_income / ctx.tax_parts >
        TMI_30_THRESHOLD_PER_PART
      ) {
        items.push(this.createItem('societe_per_dirigeant'));
      }
    }

    if (this.isEurlOrSarl(ctx)) {
      // Trimestres retraite TNS: explains how TNS trimestres are calculated
      // based on net declared income, not salary.
      items.push(
        this.createItem('retraite_eurl_sarl_explication_trimestres', {
          monthly_salary: monthlySalary,
        }),
      );

      // Risque trimestres TNS: shown when rémunération is insufficient
      // to validate 4 trimestres per year.
      if (monthlySalary < minimumMonthlySalary) {
        items.push(
          this.createItem('retraite_eurl_sarl_risque_trimestres', {
            minimum_salary: minimumMonthlySalary,
          }),
        );
      }

      // PER / Madelin for EURL/SARL: TNS have access to higher deduction
      // caps via contrat Madelin, making PER even more attractive.
      if (
        ctx.taxable_yearly_income / ctx.tax_parts >
        TMI_30_THRESHOLD_PER_PART
      ) {
        items.push(this.createItem('societe_per_dirigeant_eurl'));
      }
    }

    return items;
  }

  // ── Démission ─────────────────────────────────────────────────────────
  private checkDemission(ctx: AuditContext): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // Éligibilité ARE chômage: shown when the entrepreneur previously
    // held a salaried position. Démission légitime rules (since 2019)
    // may grant ARE rights to employees who resign to create a business.
    if (this.isPreviouslyEmployed(ctx)) {
      items.push(this.createItem('demission_are_chomage'));
    }

    // Conseil versement SASU: always relevant for SASU/SAS to advise on
    // maintaining a minimum salary for social protection continuity.
    if (this.isSasuOrSas(ctx)) {
      items.push(this.createItem('demission_sasu_conseil_versement'));
    }

    return items;
  }

  // ── ARE ───────────────────────────────────────────────────────────────

  private checkARE(ctx: AuditContext): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // ARE vs ARCE optimisation: shown when the entrepreneur has accumulated
    // ARE rights from prior employment.
    if (this.isPreviouslyEmployed(ctx)) {
      items.push(this.createItem('are_chomage_optimisation_arebasee'));
    }

    // Conseil expert SASU: always shown for SASU/SAS as the interaction
    // between SASU salary and ARE is complex.
    if (this.isSasuOrSas(ctx)) {
      items.push(this.createItem('are_chomage_conseil_expert'));
    }

    return items;
  }

  // ── AGE ───────────────────────────────────────────────────────────────

  private checkAGE(ctx: AuditContext): Partial<AuditItem>[] {
    // AGE (maintien ARE): shown to entrepreneurs who retain ARE rights
    // after company creation. They can keep monthly ARE allocations
    // while running the business.
    if (this.isPreviouslyEmployed(ctx)) {
      return [this.createItem('age_maintenir_are')];
    }

    return [];
  }

  // ── TVA ───────────────────────────────────────────────────────────────

  private checkTVA(ctx: AuditContext): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];
    const ca = ctx.onboarding.societe?.ca_est_n ?? 0;

    // Franchise en base (régime micro TVA): shown when estimated CA is
    // below 36,800€ for services, informing the entrepreneur they can
    // remain TVA-exempt.
    if (ca < TVA_FRANCHISE_THRESHOLD) {
      items.push(this.createItem('tva_choix_regime_micro'));
    }

    // Conseil expert TVA SASU: always shown for SASU/SAS as the optimal
    // TVA regime depends on activity type and client profile.
    if (this.isSasuOrSas(ctx)) {
      items.push(this.createItem('tva_sasu_sasu_conseil_expert'));
    }

    return items;
  }

  // ── Fiscalité / Gestion ───────────────────────────────────────────────

  private checkFiscalite(ctx: AuditContext): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // Educational — always shown. Deductible expenses are a major
    // optimisation lever that most early-stage founders underutilize.
    items.push(this.createItem('societe_frais_deductibles'));

    // Educational — always shown. CCA is a core financing tool for
    // company directors that is often unknown or misunderstood.
    items.push(this.createItem('societe_compte_courant_associe'));

    // IS vs IR: the choice between corporate tax and personal income tax
    // has major implications on rémunération strategy and fiscal optimisation.
    items.push(this.createItem('societe_choix_is_ir'));

    // CFE: shown from year 2 onward. Year 1 is always exempt
    // (handled in CommonAuditGenerator).
    const creationYear = ctx.creation_date
      ? new Date(ctx.creation_date).getFullYear()
      : null;
    const currentYear = new Date().getFullYear();
    if (creationYear !== null && creationYear < currentYear) {
      items.push(this.createItem('societe_cfe_cotisation'));
    }

    // Educational — always shown. Annual accounts filing is a legal
    // obligation frequently misunderstood by first-time founders.
    items.push(this.createItem('societe_liasse_fiscale_comptes'));

    // Mécénat de compétences: educational — always shown. 60% IS reduction
    // on skills donated to associations, capped at 20k€ or 5‰ CA.
    items.push(this.createItem('societe_mecenat_competences'));

    return items;
  }

  // ── Patrimoine / Investissement ────────────────────────────────────────

  private checkPatrimoine(ctx: AuditContext): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];
    const ca = ctx.onboarding.societe?.ca_est_n ?? 0;

    // Compte-titres entreprise: educational — always shown. Placing
    // excess treasury in a CTO benefits from IS taxation on capital gains.
    items.push(this.createItem('societe_compte_titre_entreprise'));

    // Holding / SCI: shown when CA exceeds 80k€, making a holding
    // structure financially worthwhile for reinvestment and patrimony.
    if (ca > HOLDING_CA_THRESHOLD) {
      items.push(this.createItem('societe_holding_investissement'));
    }

    // Holding SASU for EURL/SARL: shown to non-SASU structures to advise
    // on creating a SASU holding if they develop a scalable tech/SaaS project.
    if (this.isEurlOrSarl(ctx)) {
      items.push(this.createItem('societe_holding_saas_eurl'));
    }

    return items;
  }
}
