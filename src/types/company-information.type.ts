export interface CompanyInformation {
  situation?: string;
  siren?: string;
  siret?: string;
  company_name?: string;
  legal_form?: string;
  address?: string;
  creation_date?: string;
  bic_bnc_type?: string;
  fiscal_regime_is_ir?: string;
  ca_history_n?: number;
  ca_history_n_minus_1?: number;
  ca_history_n_minus_2?: number;
  ca_estimation_n_plus_1?: number;
  professional_expenses_est?: number;
  fiscal_liberatoire?: boolean;
  tva_regime?: string;
  has_acre?: boolean;
  tax_parts?: number;
  closing_date?: string;
  capital_social?: number;
  ca_est_n?: number;
  monthly_salary?: number;
  marital_status?: string;
  children_count?: number;
  current_professional_situation?: string;
  rfr_n_minus_2?: number;
  [key: string]: any;
}
