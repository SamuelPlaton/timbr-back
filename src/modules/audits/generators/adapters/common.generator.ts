import { Injectable } from '@nestjs/common';
import { AuditItem } from '../../../../entities';
import { CompanyInformation } from '../../../../types/company-information.type';
import { AuditConfigItem, BaseAuditGenerator } from './base.generator';
import commonConfig from '../config/audit-config.common';

// 2024 thresholds — TODO: update annually
const TMI_30_THRESHOLD_PER_PART = 28797; // Income above which the 30% marginal tax bracket applies (per fiscal part)

@Injectable()
export class CommonAuditGenerator extends BaseAuditGenerator {
  protected readonly config: AuditConfigItem[] = commonConfig;

  generate(companyInfo: CompanyInformation): Partial<AuditItem>[] {
    return [
      ...this.checkTresorerie(companyInfo),
      ...this.checkObligations(companyInfo),
    ];
  }

  // ── Trésorerie ────────────────────────────────────────────────────────

  private checkTresorerie(companyInfo: CompanyInformation): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // TODO: verify — Placements & assurances: shown to all entrepreneurs as educational
    // content about optimising cash (PER, assurance-vie, livrets). Always relevant.
    items.push(this.createItem('tresorerie_assurances_placements'));

    // TODO: verify — Changement de date de clôture: relevant when the closing date is
    // not Dec 31, indicating a mid-year arrangement that impacts the fiscal year length
    // and potential tax reduction on the first/last short period.
    const closingDate = companyInfo.closing_date ?? '';
    const isNonStandardClosingDate =
      closingDate.length > 0 &&
      !closingDate.endsWith('-12-31') &&
      !closingDate.endsWith('/12/31') &&
      !closingDate.endsWith('1231');
    if (isNonStandardClosingDate) {
      items.push(
        this.createItem('tresorerie_impots_reduction_date_cloture', {
          closing_date: closingDate,
        }),
      );
    }

    // Educational — always shown. Helps entrepreneurs understand tax caps and
    // available optimisation levers regardless of situation.
    items.push(this.createItem('tresorerie_impots_plafonds_preferences'));

    // TODO: verify — TMI optimisation: shown when estimated income places the entrepreneur
    // in the 30%+ marginal tax bracket. 2024: > 28,797€ per fiscal part (after abattement).
    const rfr = companyInfo.rfr_n_minus_2 || 0;
    const taxParts = companyInfo.tax_parts || 1;
    if (rfr / taxParts > TMI_30_THRESHOLD_PER_PART) {
      items.push(this.createItem('tresorerie_impots_tmi_optimisation'));
    }

    // Educational — always shown. Every entrepreneur accumulates CPF rights
    // and may not know they can use them for professional training.
    items.push(this.createItem('tresorerie_cpf_formations'));

    return items;
  }

  // ── Obligations universelles ──────────────────────────────────────────

  private checkObligations(companyInfo: CompanyInformation): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // Educational — always shown. Invoice compliance is universally required and
    // frequently neglected, especially in the first year of activity.
    items.push(
      this.createItem('common_facturation_conforme', {
        company_name: companyInfo.company_name ?? '',
        siret: companyInfo.siret ?? '',
      }),
    );

    // TODO: verify — RC Pro: always shown as a universal reminder. The level of urgency
    // depends on the activity type (mandatory vs recommended). Always relevant.
    items.push(this.createItem('common_rc_pro_couverture'));

    // TODO: verify — CFE first-year exemption: shown only in the year of creation,
    // as the entrepreneur needs to know they must declare before Dec 31 to benefit.
    const creationDate = companyInfo.creation_date ?? '';
    const creationYear = creationDate ? new Date(creationDate).getFullYear() : null;
    const currentYear = new Date().getFullYear();
    if (creationYear === currentYear) {
      items.push(
        this.createItem('common_cfe_premiere_annee', {
          creation_date: creationDate,
        }),
      );
    }

    return items;
  }
}
