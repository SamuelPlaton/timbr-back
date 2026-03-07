import { Situation } from '../../../../entities';
import { CommonAuditGenerator } from '../adapters/common.generator';
import { getCardIds } from './test-utils';
import {
  buildCtx,
  currentYearStart,
  previousYearDate,
  societeCtx,
} from './audit-context.factory';

describe('CommonAuditGenerator', () => {
  let generator: CommonAuditGenerator;

  beforeEach(() => {
    generator = new CommonAuditGenerator();
  });

  // ── Always-shown cards ────────────────────────────────────────────────

  it('should always include educational cards', () => {
    const ids = getCardIds(generator, buildCtx());

    expect(ids).toContain('tresorerie_assurances_placements');
    expect(ids).toContain('tresorerie_impots_plafonds_preferences');
    expect(ids).toContain('tresorerie_cpf_formations');
    expect(ids).toContain('common_facturation_conforme');
    expect(ids).toContain('common_protection_sociale');
  });

  // ── Closing date ──────────────────────────────────────────────────────

  it('should include tresorerie_impots_reduction_date_cloture when closing_date is not Dec 31', () => {
    const ctx = societeCtx({ closing_date: '2026-06-30' });
    const ids = getCardIds(generator, ctx);

    expect(ids).toContain('tresorerie_impots_reduction_date_cloture');
  });

  it('should NOT include tresorerie_impots_reduction_date_cloture when closing_date is Dec 31', () => {
    const ctx = societeCtx({ closing_date: '2026-12-31' });
    const ids = getCardIds(generator, ctx);

    expect(ids).not.toContain('tresorerie_impots_reduction_date_cloture');
  });

  it('should NOT include tresorerie_impots_reduction_date_cloture when no closing_date', () => {
    const ctx = buildCtx();
    const ids = getCardIds(generator, ctx);

    expect(ids).not.toContain('tresorerie_impots_reduction_date_cloture');
  });

  // ── TMI optimisation ──────────────────────────────────────────────────

  it('should include tresorerie_impots_tmi_optimisation when taxable_yearly_income > 29580', () => {
    const ctx = buildCtx({ taxable_yearly_income: 30000 });
    const ids = getCardIds(generator, ctx);

    expect(ids).toContain('tresorerie_impots_tmi_optimisation');
  });

  it('should NOT include tresorerie_impots_tmi_optimisation when taxable_yearly_income <= 29580', () => {
    const ctx = buildCtx({ taxable_yearly_income: 29580 });
    const ids = getCardIds(generator, ctx);

    expect(ids).not.toContain('tresorerie_impots_tmi_optimisation');
  });

  // ── CFE première année ────────────────────────────────────────────────

  it('should include common_cfe_premiere_annee when situation is FUTUR', () => {
    const ctx = buildCtx({ situation: Situation.FUTUR });
    const ids = getCardIds(generator, ctx);

    expect(ids).toContain('common_cfe_premiere_annee');
  });

  it('should include common_cfe_premiere_annee when creation_date is current year', () => {
    const ctx = buildCtx({
      situation: Situation.MICRO,
      creation_date: currentYearStart(),
    });
    const ids = getCardIds(generator, ctx);

    expect(ids).toContain('common_cfe_premiere_annee');
  });

  it('should NOT include common_cfe_premiere_annee when creation_date is previous year and not FUTUR', () => {
    const ctx = buildCtx({
      situation: Situation.MICRO,
      creation_date: previousYearDate(),
    });
    const ids = getCardIds(generator, ctx);

    expect(ids).not.toContain('common_cfe_premiere_annee');
  });
});
