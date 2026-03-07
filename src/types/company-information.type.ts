import { Situation } from '../entities';

export enum BicBncType {
  BIC = 'bic',
  BNC = 'bnc',
  BUY_SELL = 'buy_sell',
}

export enum ProfessionalSituation {
  EMPLOYEE = 'employee',
  UNEMPLOYED_COMPENSATED = 'unemployed_compensated',
  UNEMPLOYED_NOT_COMPENSATED = 'unemployed_not_compensated',
  STUDENT = 'student',
  CIVIL_SERVANT = 'civil_servant',
  OTHER = 'other',
}

export enum LegalForm {
  EURL = 'eurl',
  SARL = 'sarl',
  SASU = 'sasu',
  SAS = 'sas',
}

export enum MaritalStatus {
  SINGLE = 'single',
  MARRIED = 'married',
  PACS = 'pacs',
  DIVORCED = 'divorced',
  WIDOWED = 'widowed',
}

export interface FutureFreelanceInformation {
  current_professional_situation?: ProfessionalSituation;
  bic_bnc_type?: BicBncType;
  ca_estimation_n_plus_1?: number;
  rfr_n_minus_2?: number;
}

export interface MicroCompanyInformation {
  siren?: string;
  creation_date?: string;
  bic_bnc_type?: BicBncType;
  ca_history_n?: number;
  ca_history_n_minus_1?: number;
  ca_history_n_minus_2?: number;
  professional_expenses_est?: number;
  fiscal_liberatoire?: boolean;
  tva_regime?: string;
  has_acre?: boolean;
  tax_parts?: number;
  rfr_n_minus_2?: number;
  household_other_income?: number;
}

export interface SocietyInformation {
  siren?: string;
  legal_form?: LegalForm;
  fiscal_regime_is_ir?: string;
  creation_date?: string;
  closing_date?: string;
  capital_social?: number;
  ca_est_n?: number;
  monthly_salary?: number;
  professional_expenses_est?: number;
  has_acre?: boolean;
  marital_status?: MaritalStatus;
  children_count?: number;
  previous_professional_situation?: ProfessionalSituation;
  rfr_n_minus_2?: number;
  household_other_income?: number;
}

export type CompanyInformation =
  | ({ situation: Situation.FUTUR } & FutureFreelanceInformation)
  | ({ situation: Situation.MICRO } & MicroCompanyInformation)
  | ({ situation: Situation.SOCIETE } & SocietyInformation);
