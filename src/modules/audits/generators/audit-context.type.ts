import { Situation } from '../../../entities';
import {
  BicBncType,
  FutureFreelanceInformation,
  MicroCompanyInformation,
  SocietyInformation,
} from '../../../types/company-information.type';

export interface AuditContext {
  situation: Situation;

  // ── Computed / normalised fields ──────────────────────────────────────
  /** Raw gross income: CA (FUTUR/MICRO) or gross salary × 12 (SOCIETE). No abattement applied. */
  yearly_income: number;
  /** Taxable income after flat-rate abattement (FUTUR/MICRO) or gross salary × 12 (SOCIETE). */
  taxable_yearly_income: number;
  /** Fiscal parts — computed from micro.tax_parts or société marital_status + children_count. */
  tax_parts: number;
  /** Computed from micro/société onboarding. Used in common generator for invoice compliance. */
  siren: string;
  /** Computed from micro/société onboarding. Used in common and situation generators for CFE. */
  creation_date: string;
  /** Normalised activity type. Shared between futur and micro. */
  bic_bnc_type: BicBncType | null;

  // ── Raw onboarding data per situation ────────────────────────────────
  onboarding: {
    futur: FutureFreelanceInformation | null;
    micro: MicroCompanyInformation | null;
    societe: SocietyInformation | null;
  };
}
