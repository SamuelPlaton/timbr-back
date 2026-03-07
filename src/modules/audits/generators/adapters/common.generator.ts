import { Injectable } from '@nestjs/common';
import { AuditItem, Situation } from '../../../../entities';
import { AuditContext } from '../audit-context.type';
import { AuditConfigItem, BaseAuditGenerator } from './base.generator';
import commonConfig from '../config/audit-config.common';

// 2026 thresholds
const TMI_30_THRESHOLD_PER_PART = 29580; // Income above which the 30% marginal tax bracket applies (per fiscal part)

@Injectable()
export class CommonAuditGenerator extends BaseAuditGenerator {
  protected readonly config: AuditConfigItem[] = commonConfig;

  generate(ctx: AuditContext): Partial<AuditItem>[] {
    return [...this.checkTresorerie(ctx), ...this.checkObligations(ctx)];
  }

  // ── Trésorerie ────────────────────────────────────────────────────────

  private checkTresorerie(ctx: AuditContext): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // content about optimising cash (PER, assurance-vie, livrets). Always relevant.
    items.push(this.createItem('tresorerie_assurances_placements'));

    // not Dec 31, indicating a mid-year arrangement that impacts the fiscal year length
    // and potential tax reduction on the first/last short period.
    const closingDate = ctx.onboarding.societe?.closing_date ?? '';
    const isNonStandardClosingDate =
      closingDate.length > 0 && !closingDate.endsWith('-12-31');
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

    // in the 30%+ marginal tax bracket. 2026: > 29,580€ per fiscal part (after abattement).
    if (ctx.taxable_yearly_income > TMI_30_THRESHOLD_PER_PART) {
      items.push(this.createItem('tresorerie_impots_tmi_optimisation'));
    }

    // Educational — always shown. Every entrepreneur accumulates CPF rights
    // and may not know they can use them for professional training.
    items.push(this.createItem('tresorerie_cpf_formations'));

    return items;
  }

  // ── Obligations universelles ──────────────────────────────────────────

  private checkObligations(ctx: AuditContext): Partial<AuditItem>[] {
    const items: Partial<AuditItem>[] = [];

    // Educational — always shown. Invoice compliance is universally required and
    // frequently neglected, especially in the first year of activity.
    items.push(
      this.createItem('common_facturation_conforme', {
        siren: ctx.siren || '<votre_numéro_de_siren>',
      }),
    );

    // depends on the activity type (mandatory vs recommended). Always relevant.
    items.push(this.createItem('common_protection_sociale'));

    // CFE educational card: shown for FUTUR (about to create) and for companies
    // in their first year of activity (creation_date within the current year).
    const creationYear = ctx.creation_date
      ? new Date(ctx.creation_date).getFullYear()
      : null;
    const currentYear = new Date().getFullYear();
    const isFirstYear = creationYear === currentYear;
    const isFutur = ctx.situation === Situation.FUTUR;
    if (isFutur || isFirstYear) {
      items.push(this.createItem('common_cfe_premiere_annee'));
    }

    return items;
  }
}
