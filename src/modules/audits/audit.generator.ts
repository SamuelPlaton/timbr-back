import { Injectable } from '@nestjs/common';
import {
  AuditItem,
  AuditItemType,
  AuditItemCategory,
  AuditItemSource,
} from '../../entities';
import { CompanyInformation } from '../../types/company-information.type';
import * as auditConfig from './audit-config.json';

@Injectable()
export class AuditGenerator {
  private config = auditConfig;

  generate(companyInfo: CompanyInformation): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];
    const situation = companyInfo.situation?.toLowerCase();

    // Split by situation (4 big if/else blocks)
    if (situation === 'future' || situation === 'futur') {
      items.push(...this.generateFutureAudits(companyInfo));
    } else if (situation === 'micro') {
      items.push(...this.generateMicroAudits(companyInfo));
    } else if (situation === 'society' || situation === 'société') {
      items.push(...this.generateSocietyAudits(companyInfo));
    }

    // Common audits that apply to all situations
    items.push(...this.generateCommonAudits(companyInfo));

    return items;
  }

  private generateFutureAudits(
    companyInfo: CompanyInformation,
  ): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // Future-specific scenarios
    items.push(...this.checkFutureTVA(companyInfo));
    items.push(...this.checkFutureRFR(companyInfo));
    items.push(...this.checkFutureARE(companyInfo));

    return items;
  }

  private generateMicroAudits(
    companyInfo: CompanyInformation,
  ): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // Micro-specific scenarios
    items.push(...this.checkTNSTVA(companyInfo));
    items.push(...this.checkFiscalitePrelevements(companyInfo));
    items.push(...this.checkFiscaliteURSSAF(companyInfo));
    items.push(...this.checkSimulation(companyInfo));

    return items;
  }

  private generateSocietyAudits(
    companyInfo: CompanyInformation,
  ): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // Society-specific scenarios
    items.push(...this.checkSocialSASU(companyInfo));
    items.push(...this.checkRetraiteSASU(companyInfo));
    items.push(...this.checkDemission(companyInfo));
    items.push(...this.checkARE(companyInfo));
    items.push(...this.checkAGE(companyInfo));
    items.push(...this.checkTVASASU(companyInfo));

    return items;
  }

  private generateCommonAudits(
    companyInfo: CompanyInformation,
  ): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // Common scenarios for all situations
    items.push(...this.checkTresorerie(companyInfo));

    return items;
  }

  // ============================================
  // FUTURE SCENARIOS
  // ============================================

  private checkFutureTVA(
    companyInfo: CompanyInformation,
  ): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // TODO: Implement condition - Prévoyance et assurances
    const needsInsurance = true; // Replace with actual condition
    if (needsInsurance) {
      items.push(
        this.createAuditItemFromConfig('futur_tva_prevoyance_assurances', {}),
      );
    }

    return items;
  }

  private checkFutureRFR(
    companyInfo: CompanyInformation,
  ): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // TODO: Implement condition - RFR > seuil
    const rfr = companyInfo.rfr_n_minus_2 || 0;
    const threshold = 77700; // This is an example threshold
    if (rfr > threshold) {
      items.push(
        this.createAuditItemFromConfig('futur_rfr_changement_regime', {
          rfr_threshold: threshold,
        }),
      );
    }

    return items;
  }

  private checkFutureARE(
    companyInfo: CompanyInformation,
  ): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // TODO: Implement condition - Optimisation chômage ARE vs ARCE
    const hasARERights = true; // Replace with actual condition
    if (hasARERights) {
      items.push(
        this.createAuditItemFromConfig('futur_optimisation_arebasee', {}),
      );
    }

    return items;
  }

  // ============================================
  // MICRO (TNS) SCENARIOS
  // ============================================

  private checkTNSTVA(companyInfo: CompanyInformation): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // TODO: Implement condition - CA annuel > 77 700€ (par part)
    const ca = companyInfo.ca_history_n || 0;
    const taxParts = companyInfo.tax_parts || 1;
    const caPerPart = ca / taxParts;

    if (caPerPart > 77700) {
      items.push(
        this.createAuditItemFromConfig(
          'tns_tva_liberation_eligible_danger',
          {},
        ),
      );
    } else {
      items.push(this.createAuditItemFromConfig('tns_tva_guide_accre', {}));
    }

    return items;
  }

  private checkFiscalitePrelevements(
    companyInfo: CompanyInformation,
  ): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // TODO: Implement condition - RFR > seuil pour prélèvement libératoire
    const rfr = companyInfo.rfr_n_minus_2 || 0;
    const rfrThreshold = 27000; // Example threshold per part

    if (rfr > rfrThreshold) {
      items.push(
        this.createAuditItemFromConfig(
          'fiscalite_prelevements_liberatoires_danger',
          {},
        ),
      );
    } else {
      items.push(
        this.createAuditItemFromConfig(
          'fiscalite_prelevements_acces_eligible',
          {},
        ),
      );

      // TODO: Calculate savings
      const savings = 500; // Replace with actual calculation
      items.push(
        this.createAuditItemFromConfig('fiscalite_prelevements_calcul_gains', {
          savings,
        }),
      );
    }

    return items;
  }

  private checkFiscaliteURSSAF(
    companyInfo: CompanyInformation,
  ): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // TODO: Implement condition - Déclaration URSSAF à effectuer
    const needsURSSAFDeclaration = true; // Replace with actual condition
    if (needsURSSAFDeclaration) {
      items.push(
        this.createAuditItemFromConfig('fiscalite_urssaf_declaration', {}),
      );
    }

    // TODO: Implement condition - Charges fiscales > seuil
    const professionalExpenses = companyInfo.professional_expenses_est || 0;
    if (professionalExpenses > 10000) {
      items.push(
        this.createAuditItemFromConfig(
          'fiscalite_reductions_entreprise_orange',
          {},
        ),
      );
    }

    // TODO: Implement condition - Plafond de cotisations atteint
    const ca = companyInfo.ca_history_n || 0;
    if (ca > 70000) {
      items.push(
        this.createAuditItemFromConfig('fiscalite_plafonds_cotisations', {}),
      );
    }

    return items;
  }

  private checkSimulation(
    companyInfo: CompanyInformation,
  ): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // TODO: Implement condition - Versement libératoire
    const hasFiscalLiberatoire = companyInfo.fiscal_liberatoire;
    if (hasFiscalLiberatoire) {
      items.push(
        this.createAuditItemFromConfig(
          'simulation_micro_entreprise_versements',
          {},
        ),
      );
    }

    // TODO: Implement condition - Statut adapté
    const ca = companyInfo.ca_history_n || 0;
    if (ca < 70000) {
      items.push(
        this.createAuditItemFromConfig(
          'simulation_micro_entreprise_status',
          {},
        ),
      );
    }

    return items;
  }

  // ============================================
  // SOCIETY (SASU/SAS/EURL/SARL) SCENARIOS
  // ============================================

  private checkSocialSASU(
    companyInfo: CompanyInformation,
  ): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // TODO: Implement condition - CA > seuil pour SASU
    const ca = companyInfo.ca_est_n || 0;
    const threshold = 50000;

    if (ca > threshold) {
      items.push(
        this.createAuditItemFromConfig(
          'social_sas_sasu_micro_entreprise_avertissement',
          { threshold },
        ),
      );
    }

    // TODO: Implement condition - Protection sociale SASU
    const legalForm = companyInfo.legal_form?.toLowerCase();
    if (legalForm === 'sasu' || legalForm === 'sas') {
      items.push(
        this.createAuditItemFromConfig(
          'social_sas_sasu_protection_sociale',
          {},
        ),
      );
    }

    // TODO: Implement condition - Estimation revenus
    const monthlySalary = companyInfo.monthly_salary || 0;
    const estimatedRevenue = monthlySalary * 12;
    if (estimatedRevenue > 0) {
      items.push(
        this.createAuditItemFromConfig('social_rapport_estimation_revenus', {
          estimated_revenue: estimatedRevenue,
        }),
      );
    }

    // TODO: Implement condition - Dividendes
    if (legalForm === 'sasu' && ca > 50000) {
      items.push(this.createAuditItemFromConfig('social_sasu_dividendes', {}));
    }

    return items;
  }

  private checkRetraiteSASU(
    companyInfo: CompanyInformation,
  ): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // TODO: Implement condition - Proposition ARE basée sur droits
    const legalForm = companyInfo.legal_form?.toLowerCase();
    if (legalForm === 'sasu' || legalForm === 'sas') {
      items.push(
        this.createAuditItemFromConfig(
          'retraite_sasu_declaration_arebasee',
          {},
        ),
      );

      // TODO: Calculate quarters based on salary
      const monthlySalary = companyInfo.monthly_salary || 0;
      const quarters = Math.min(4, Math.floor(monthlySalary / 600)); // Simplified calculation
      items.push(
        this.createAuditItemFromConfig('retraite_sasu_explication_trimestres', {
          monthly_salary: monthlySalary,
          quarters,
        }),
      );

      // TODO: Check minimum salary for quarters validation
      if (monthlySalary < 600) {
        items.push(
          this.createAuditItemFromConfig(
            'retraite_validation_prelevements_personnel',
            {
              minimum_salary: 600,
            },
          ),
        );
      }
    }

    return items;
  }

  private checkDemission(
    companyInfo: CompanyInformation,
  ): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // TODO: Implement condition - Éligibilité ARE chômage
    const isEligibleARE = true; // Replace with actual condition
    if (isEligibleARE) {
      items.push(this.createAuditItemFromConfig('demission_are_chomage', {}));
    }

    // TODO: Implement condition - Conseil versement SASU
    const legalForm = companyInfo.legal_form?.toLowerCase();
    if (legalForm === 'sasu' || legalForm === 'sas') {
      items.push(
        this.createAuditItemFromConfig('demission_sasu_conseil_versement', {}),
      );
    }

    return items;
  }

  private checkARE(companyInfo: CompanyInformation): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // TODO: Implement condition - Optimisation ARE vs ARCE
    const hasARERights = true; // Replace with actual condition
    if (hasARERights) {
      items.push(
        this.createAuditItemFromConfig('are_chomage_optimisation_arebasee', {}),
      );
    }

    // TODO: Implement condition - Conseil expert
    const legalForm = companyInfo.legal_form?.toLowerCase();
    if (legalForm === 'sasu' || legalForm === 'sas') {
      items.push(
        this.createAuditItemFromConfig('are_chomage_conseil_expert', {}),
      );
    }

    return items;
  }

  private checkAGE(companyInfo: CompanyInformation): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // TODO: Implement condition - AGE eligibility
    const isEligibleAGE = true; // Replace with actual condition
    if (isEligibleAGE) {
      items.push(this.createAuditItemFromConfig('age_maintenir_are', {}));
    }

    return items;
  }

  private checkTVASASU(companyInfo: CompanyInformation): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    const legalForm = companyInfo.legal_form?.toLowerCase();

    // TODO: Implement condition - Choix régime TVA
    const ca = companyInfo.ca_est_n || 0;
    if (ca < 36800) {
      items.push(this.createAuditItemFromConfig('tva_choix_regime_micro', {}));
    }

    // TODO: Implement condition - Risque crédibilité
    if (ca > 20000 && !companyInfo.tva_regime) {
      items.push(this.createAuditItemFromConfig('tva_risque_credibilite', {}));
    }

    // TODO: Implement condition - Conseil expert SASU
    if (legalForm === 'sasu' || legalForm === 'sas') {
      items.push(
        this.createAuditItemFromConfig('tva_sasu_sasu_conseil_expert', {}),
      );
    }

    return items;
  }

  // ============================================
  // COMMON (TRÉSORERIE) SCENARIOS
  // ============================================

  private checkTresorerie(
    companyInfo: CompanyInformation,
  ): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // TODO: Implement condition - Placements et assurances
    const hasGoodCashflow = true; // Replace with actual condition
    if (hasGoodCashflow) {
      items.push(
        this.createAuditItemFromConfig('tresorerie_assurances_placements', {}),
      );
    }

    // TODO: Implement condition - Changement date de clôture
    const hasChangedClosingDate = false; // Replace with actual condition
    if (hasChangedClosingDate) {
      items.push(
        this.createAuditItemFromConfig(
          'tresorerie_impots_reduction_date_cloture',
          {},
        ),
      );
    }

    // TODO: Implement condition - Plafonds préférences
    items.push(
      this.createAuditItemFromConfig(
        'tresorerie_impots_plafonds_preferences',
        {},
      ),
    );

    // TODO: Implement condition - TMI optimization
    const highTMI = true; // Replace with actual condition
    if (highTMI) {
      items.push(
        this.createAuditItemFromConfig(
          'tresorerie_impots_tmi_optimisation',
          {},
        ),
      );
    }

    // TODO: Implement condition - CPF formations
    items.push(this.createAuditItemFromConfig('tresorerie_cpf_formations', {}));

    return items;
  }

  // ============================================
  // HELPER METHODS
  // ============================================

  private createAuditItemFromConfig(
    configId: string,
    variables: Record<string, any> = {},
  ): Partial<AuditItem> {
    const configItem = this.config.find((item) => item.id === configId);

    if (!configItem) {
      throw new Error(`Audit config not found for id: ${configId}`);
    }

    // Replace variables in content
    let content = configItem.content;
    Object.keys(variables).forEach((key) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      content = content.replace(regex, String(variables[key]));
    });

    return {
      type: configItem.type as AuditItemType,
      title: configItem.title,
      summary: configItem.summary,
      content,
      category: configItem.category as AuditItemCategory,
      sources: (configItem as any).sources || [],
    };
  }
}
