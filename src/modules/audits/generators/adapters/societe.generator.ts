import { Injectable } from '@nestjs/common';
import { AuditItem } from '../../../../entities';
import { CompanyInformation } from '../../../../types/company-information.type';
import { AuditConfigItem, BaseAuditGenerator } from './base.generator';
import societeConfig from '../config/audit-config.societe';

// 2024 thresholds — TODO: update annually
const SASU_ADVANTAGE_CA_THRESHOLD = 77700; // CA above which SASU often becomes more advantageous than micro
const TVA_FRANCHISE_THRESHOLD = 36800; // Franchise en base de TVA ceiling — prestations de services
const TVA_CREDIBILITY_CA_THRESHOLD = 20000; // CA above which operating without TVA may hurt B2B credibility
// SMIC 2024: 11.65€/h — 150h × 11.65€ ≈ 1,747€ needed per quarter to validate 1 retraite trimestre
const RETRAITE_QUARTERLY_VALIDATION_SALARY = 1747; // Minimum quarterly earnings to validate 1 trimestre
const TMI_30_THRESHOLD_PER_PART = 28797; // 2024 — 30% bracket start per fiscal part

@Injectable()
export class SocieteAuditGenerator extends BaseAuditGenerator {
  protected readonly config: AuditConfigItem[] = societeConfig;

  generate(companyInfo: CompanyInformation): Partial<AuditItem>[] {
    return [
      ...this.checkSocial(companyInfo),
      ...this.checkRetraite(companyInfo),
      ...this.checkDemission(companyInfo),
      ...this.checkARE(companyInfo),
      ...this.checkAGE(companyInfo),
      ...this.checkTVA(companyInfo),
      ...this.checkFiscalite(companyInfo),
    ];
  }

  private isSasuOrSas(companyInfo: CompanyInformation): boolean {
    const form = companyInfo.legal_form?.toLowerCase() ?? '';
    return form === 'sasu' || form === 'sas';
  }

  private isEurlOrSarl(companyInfo: CompanyInformation): boolean {
    const form = companyInfo.legal_form?.toLowerCase() ?? '';
    return form === 'eurl' || form === 'sarl';
  }

  private isPreviouslyEmployed(companyInfo: CompanyInformation): boolean {
    const situation = companyInfo.current_professional_situation?.toLowerCase() ?? '';
    return ['employed', 'employee', 'salarie', 'salarié'].includes(situation);
  }

  // ── Social ────────────────────────────────────────────────────────────

  private checkSocial(companyInfo: CompanyInformation): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];
    const ca = companyInfo.ca_est_n || 0;
    const monthlySalary = companyInfo.monthly_salary || 0;
    const estimatedRevenue = monthlySalary * 12;

    // TODO: verify — Avertissement SASU vs micro: when CA exceeds 77,700€, social charges
    // in micro-entreprise (flat rate on CA) often exceed those of a SASU (charges on salary
    // only), making the transition to SASU financially attractive.
    if (ca > SASU_ADVANTAGE_CA_THRESHOLD) {
      items.push(
        this.createItem('social_sas_sasu_micro_entreprise_avertissement', {
          threshold: SASU_ADVANTAGE_CA_THRESHOLD,
        }),
      );
    }

    // TODO: verify — Protection sociale SASU/SAS: relevant only for SASU/SAS entrepreneurs
    // who benefit from assimilé-salarié status, granting full employee-equivalent social
    // protection (health, retirement, unemployment, disability).
    if (this.isSasuOrSas(companyInfo)) {
      items.push(this.createItem('social_sas_sasu_protection_sociale'));
    }

    // TODO: verify — Statut TNS EURL/SARL: shown for gérant majoritaire to explain the
    // fundamental differences from SASU (charges, protection, cotisations minimales).
    if (this.isEurlOrSarl(companyInfo)) {
      items.push(this.createItem('societe_eurl_sarl_statut_tns'));
    }

    // TODO: verify — Estimation revenus: shown when a salary is being drawn, to inform
    // the entrepreneur of their estimated gross annual income and resulting social charges.
    if (estimatedRevenue > 0) {
      items.push(
        this.createItem('social_rapport_estimation_revenus', {
          estimated_revenue: estimatedRevenue,
        }),
      );
    }

    // TODO: verify — Optimisation rémunération: shown for all société entrepreneurs as
    // the salary vs dividends question arises at any income level and requires guidance.
    items.push(this.createItem('societe_optimisation_remuneration'));

    // TODO: verify — Dividendes SASU: shown when the SASU generates meaningful revenue
    // above the SASU advantage threshold, making a salary + dividends mix worth exploring.
    // Dividends in SASU are subject to flat tax (30%) with no additional social charges.
    if (this.isSasuOrSas(companyInfo) && ca > SASU_ADVANTAGE_CA_THRESHOLD) {
      items.push(this.createItem('social_sasu_dividendes'));
    }

    return items;
  }

  // ── Retraite ──────────────────────────────────────────────────────────

  private checkRetraite(companyInfo: CompanyInformation): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    if (!this.isSasuOrSas(companyInfo)) return items;

    const monthlySalary = companyInfo.monthly_salary || 0;
    const annualSalary = monthlySalary * 12;

    // TODO: verify — ARE basée sur droits: SASU/SAS entrepreneurs who previously worked
    // as employees should verify their ARE rights are correctly calculated before the
    // transition, as the opening of a SASU can impact the calculation date.
    items.push(this.createItem('retraite_sasu_declaration_arebasee'));

    // TODO: verify — Trimestres retraite: 2024 rule — earn at least SMIC × 150h (≈ 1,747€)
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

    // TODO: verify — Risque trimestres: shown when the quarterly salary is insufficient
    // to validate even 1 retraite trimestre. Minimum monthly salary ≈ 582€ (1,747€ / 3).
    const minimumMonthlySalary = Math.round(RETRAITE_QUARTERLY_VALIDATION_SALARY / 3);
    if (monthlySalary < minimumMonthlySalary) {
      items.push(
        this.createItem('retraite_validation_prelevements_personnel', {
          minimum_salary: minimumMonthlySalary,
        }),
      );
    }

    // TODO: verify — PER dirigeant: shown when the director's salary puts them in the 30%+
    // TMI bracket, making PER contributions highly tax-efficient.
    const rfr = companyInfo.rfr_n_minus_2 || 0;
    const taxParts = companyInfo.tax_parts || 1;
    if (rfr / taxParts > TMI_30_THRESHOLD_PER_PART) {
      items.push(this.createItem('societe_per_dirigeant'));
    }

    return items;
  }

  // ── Démission ─────────────────────────────────────────────────────────

  private checkDemission(companyInfo: CompanyInformation): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // TODO: verify — Éligibilité ARE chômage: shown when the entrepreneur previously
    // held a salaried position. Démission légitime rules (since 2019) may grant ARE rights
    // to employees who resign to create or take over a business.
    if (this.isPreviouslyEmployed(companyInfo)) {
      items.push(this.createItem('demission_are_chomage'));
    }

    // TODO: verify — Conseil versement SASU: always relevant for SASU/SAS to advise on
    // maintaining a minimum salary for social protection continuity and retraite trimestres.
    if (this.isSasuOrSas(companyInfo)) {
      items.push(this.createItem('demission_sasu_conseil_versement'));
    }

    return items;
  }

  // ── ARE ───────────────────────────────────────────────────────────────

  private checkARE(companyInfo: CompanyInformation): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // TODO: verify — ARE vs ARCE optimisation: shown when the entrepreneur has accumulated
    // ARE rights. They must choose between monthly ARE payments or ARCE (lump-sum = 60%
    // of remaining rights). ARE is generally recommended when activity income is uncertain.
    if (this.isPreviouslyEmployed(companyInfo)) {
      items.push(this.createItem('are_chomage_optimisation_arebasee'));
    }

    // TODO: verify — Conseil expert SASU: always shown for SASU/SAS as the interaction
    // between SASU salary and ARE is complex — each month of salary reduces ARE proportionally.
    if (this.isSasuOrSas(companyInfo)) {
      items.push(this.createItem('are_chomage_conseil_expert'));
    }

    return items;
  }

  // ── AGE ───────────────────────────────────────────────────────────────

  private checkAGE(companyInfo: CompanyInformation): Partial<AuditItem>[] {
    // TODO: verify — AGE (Aide à la Gestion de l'Entreprise): shown to entrepreneurs who
    // retain ARE rights after company creation. Under AGE rules, they can keep monthly ARE
    // allocations while running the business, making it a key cash-flow optimisation lever.
    if (this.isPreviouslyEmployed(companyInfo)) {
      return [this.createItem('age_maintenir_are')];
    }

    return [];
  }

  // ── TVA ───────────────────────────────────────────────────────────────

  private checkTVA(companyInfo: CompanyInformation): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];
    const ca = companyInfo.ca_est_n || 0;

    // TODO: verify — Franchise en base (régime micro TVA): shown when estimated CA is
    // below 36,800€ for services, informing the entrepreneur they can remain TVA-exempt.
    // This simplifies accounting but prevents TVA recovery on purchases.
    if (ca < TVA_FRANCHISE_THRESHOLD) {
      items.push(this.createItem('tva_choix_regime_micro'));
    }

    // TODO: verify — Risque crédibilité B2B: shown when CA exceeds 20,000€ without a
    // declared TVA regime. Professional clients often prefer TVA-registered suppliers.
    if (ca > TVA_CREDIBILITY_CA_THRESHOLD && !companyInfo.tva_regime) {
      items.push(this.createItem('tva_risque_credibilite'));
    }

    // TODO: verify — Conseil expert TVA SASU: always shown for SASU/SAS as the optimal
    // TVA regime (réel simplifié vs réel normal vs franchise) depends on activity type.
    if (this.isSasuOrSas(companyInfo)) {
      items.push(this.createItem('tva_sasu_sasu_conseil_expert'));
    }

    return items;
  }

  // ── Fiscalité / Gestion ───────────────────────────────────────────────

  private checkFiscalite(companyInfo: CompanyInformation): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // Educational — always shown. Deductible expenses are a major optimisation lever
    // that most early-stage founders heavily underutilize.
    items.push(this.createItem('societe_frais_deductibles'));

    // Educational — always shown. CCA is a core financing tool for company directors
    // that is often unknown or misunderstood.
    items.push(this.createItem('societe_compte_courant_associe'));

    // TODO: verify — CFE: shown from year 2 onward. Trigger: creation_date is more
    // than 1 year ago. Year 1 is always exempt (handled in CommonAuditGenerator).
    const creationDate = companyInfo.creation_date ?? '';
    const creationYear = creationDate ? new Date(creationDate).getFullYear() : null;
    const currentYear = new Date().getFullYear();
    if (creationYear !== null && creationYear < currentYear) {
      items.push(this.createItem('societe_cfe_cotisation'));
    }

    // Educational — always shown. Annual accounts filing is a legal obligation and
    // frequently misunderstood by first-time founders.
    items.push(this.createItem('societe_liasse_fiscale_comptes'));

    return items;
  }
}
