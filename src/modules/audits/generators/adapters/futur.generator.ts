import { Injectable } from '@nestjs/common';
import { AuditItem } from '../../../../entities';
import { CompanyInformation } from '../../../../types/company-information.type';
import { AuditConfigItem, BaseAuditGenerator } from './base.generator';
import futurConfig from '../config/audit-config.futur';

// 2024 thresholds — TODO: update annually
const RFR_PL_THRESHOLD_PER_PART = 27478; // Max RFR N-2 per fiscal part to opt for prélèvement libératoire

@Injectable()
export class FuturAuditGenerator extends BaseAuditGenerator {
  protected readonly config: AuditConfigItem[] = futurConfig;

  generate(companyInfo: CompanyInformation): Partial<AuditItem>[] {
    return [
      ...this.checkStructure(companyInfo),
      ...this.checkProtection(companyInfo),
      ...this.checkFiscalite(companyInfo),
      ...this.checkARE(companyInfo),
    ];
  }

  // ── Choix de structure ────────────────────────────────────────────────

  private checkStructure(companyInfo: CompanyInformation): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // Educational — always shown. The structure choice (Micro vs SASU vs EURL) is the
    // single most important decision for any future entrepreneur.
    items.push(this.createItem('futur_choix_structure'));

    // TODO: verify — ACRE eligibility: shown when the entrepreneur is creating for the
    // first time (no prior ACRE in last 3 years). has_acre = false is a reliable proxy.
    if (!companyInfo.has_acre) {
      items.push(this.createItem('futur_acre_eligibilite'));
    }

    // TODO: verify — Professional bank account: always shown as early advice.
    // Mandatory for companies from creation, strongly advised for all.
    items.push(this.createItem('futur_compte_bancaire_pro'));

    return items;
  }

  // ── Protection & assurances ───────────────────────────────────────────

  private checkProtection(companyInfo: CompanyInformation): Partial<AuditItem>[] {
    // TODO: verify — RC Pro & prévoyance: shown to all future entrepreneurs as they
    // typically have no professional coverage before registration. Always educational.
    return [
      this.createItem('futur_tva_prevoyance_assurances'),
      this.createItem('futur_rc_pro_obligation'),
    ];
  }

  // ── Fiscalité ─────────────────────────────────────────────────────────

  private checkFiscalite(companyInfo: CompanyInformation): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // TODO: verify — Risque changement de régime fiscal: when RFR N-2 exceeds the
    // prélèvement libératoire ceiling, the entrepreneur will not be eligible for the
    // simplified PL regime on income. 2024 rule: RFR N-2 / tax_parts > 27,478€.
    const rfr = companyInfo.rfr_n_minus_2 || 0;
    const taxParts = companyInfo.tax_parts || 1;
    if (rfr / taxParts > RFR_PL_THRESHOLD_PER_PART) {
      items.push(
        this.createItem('futur_rfr_changement_regime', {
          rfr_threshold: RFR_PL_THRESHOLD_PER_PART,
        }),
      );
    }

    return items;
  }

  // ── ARE / Chômage ─────────────────────────────────────────────────────

  private checkARE(companyInfo: CompanyInformation): Partial<AuditItem>[] {
    // TODO: verify — ARE vs ARCE optimisation: relevant when the future entrepreneur
    // is currently employed (or recently was) and will accumulate ARE rights upon leaving.
    // Trigger: current_professional_situation indicates employment status.
    const previousSituation =
      companyInfo.current_professional_situation?.toLowerCase() ?? '';
    const isPreviouslyEmployed = [
      'employed',
      'employee',
      'salarie',
      'salarié',
    ].includes(previousSituation);

    if (isPreviouslyEmployed) {
      return [this.createItem('futur_optimisation_arebasee')];
    }

    return [];
  }
}
