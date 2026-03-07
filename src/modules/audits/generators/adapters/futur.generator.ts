import { Injectable } from '@nestjs/common';
import { AuditItem } from '../../../../entities';
import {
  BicBncType,
  ProfessionalSituation,
} from '../../../../types/company-information.type';
import { AuditContext } from '../audit-context.type';
import { AuditConfigItem, BaseAuditGenerator } from './base.generator';
import futurConfig from '../config/audit-config.futur';

// 2026 thresholds
const RFR_PL_THRESHOLD_PER_PART = 29315; // Max RFR N-2 per fiscal part to opt for prélèvement libératoire

@Injectable()
export class FuturAuditGenerator extends BaseAuditGenerator {
  protected readonly config: AuditConfigItem[] = futurConfig;

  generate(ctx: AuditContext): Partial<AuditItem>[] {
    return [
      ...this.checkStructure(ctx),
      ...this.checkFiscalite(ctx),
      ...this.checkTVA(ctx),
      ...this.checkARE(ctx),
    ];
  }

  // ── Choix de structure ────────────────────────────────────────────────

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private checkStructure(ctx: AuditContext): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // Educational — always shown. The structure choice (Micro vs SASU vs EURL) is the
    // single most important decision for any future entrepreneur.
    items.push(this.createItem('futur_choix_structure'));

    // ACRE eligibility: shown when the entrepreneur is creating for the
    // first time (no prior ACRE in last 3 years). has_acre = false is a reliable proxy.
    items.push(this.createItem('futur_acre_eligibilite'));

    // Professional bank account: always shown as early advice.
    // Mandatory for companies from creation, strongly advised for all.
    items.push(this.createItem('futur_compte_bancaire_pro'));

    return items;
  }

  // ── Fiscalité ─────────────────────────────────────────────────────────

  private checkFiscalite(ctx: AuditContext): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // Risque changement de régime fiscal: when RFR N-2 exceeds the
    // prélèvement libératoire ceiling, the entrepreneur will not be eligible for the
    // simplified PL regime on income. 2024 rule: RFR N-2 / tax_parts > 27,478€.
    const rfr = ctx.onboarding.futur?.rfr_n_minus_2 ?? 0;
    if (rfr / ctx.tax_parts > RFR_PL_THRESHOLD_PER_PART) {
      items.push(
        this.createItem('futur_rfr_changement_regime', {
          rfr_threshold: RFR_PL_THRESHOLD_PER_PART,
        }),
      );
    } else {
      items.push(
        this.createItem('futur_prelevementliberatoire_eligible', {
          rfr_threshold: RFR_PL_THRESHOLD_PER_PART,
        }),
      );
    }

    // Abattement explication: educational — always shown to help future
    // entrepreneurs understand how taxation works in micro without PL.
    items.push(this.createItem('futur_abattement_explication'));

    return items;
  }

  // ── TVA ───────────────────────────────────────────────────────────────

  private checkTVA(ctx: AuditContext): Partial<AuditItem>[] {
    const caEstime = ctx.onboarding.futur?.ca_estimation_n_plus_1 ?? 0;
    const isBuySell = ctx.bic_bnc_type === BicBncType.BUY_SELL;
    const tvaSeuil = isBuySell ? 91900 : 36800;
    const tvaMajore = isBuySell ? 101000 : 39100;

    return [
      this.createItem('futur_tva_franchise_explication', {
        ca_estime: caEstime,
        tva_seuil_base: tvaSeuil,
        tva_seuil_majore: tvaMajore,
      }),
    ];
  }

  // ── ARE / Chômage ─────────────────────────────────────────────────────

  private checkARE(ctx: AuditContext): Partial<AuditItem>[] {
    // ARE vs ARCE optimisation: relevant when the future entrepreneur
    // is currently employed (or recently was) and will accumulate ARE rights upon leaving.
    // Trigger: current_professional_situation indicates employment status.
    const ps = ctx.onboarding.futur?.current_professional_situation ?? null;
    if (
      ps === null ||
      ps === ProfessionalSituation.EMPLOYEE ||
      ps === ProfessionalSituation.UNEMPLOYED_COMPENSATED
    ) {
      return [this.createItem('futur_optimisation_arebasee')];
    }

    return [];
  }
}
