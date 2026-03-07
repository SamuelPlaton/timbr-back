import {
  BicBncType,
  ProfessionalSituation,
} from '../../../../types/company-information.type';
import { FuturAuditGenerator } from '../adapters/futur.generator';
import { getCardIds, generateWithIds } from './test-utils';
import { futurCtx } from './audit-context.factory';

describe('FuturAuditGenerator', () => {
  let generator: FuturAuditGenerator;

  beforeEach(() => {
    generator = new FuturAuditGenerator();
  });

  // ── Structure — always shown ──────────────────────────────────────────

  it('should always include structure cards', () => {
    const ids = getCardIds(generator, futurCtx());

    expect(ids).toContain('futur_choix_structure');
    expect(ids).toContain('futur_acre_eligibilite');
    expect(ids).toContain('futur_compte_bancaire_pro');
  });

  // ── Fiscalité — RFR threshold ─────────────────────────────────────────

  it('should include futur_rfr_changement_regime when RFR/parts > 29315', () => {
    const ctx = futurCtx({ rfr_n_minus_2: 30000 }, { tax_parts: 1 });
    const ids = getCardIds(generator, ctx);

    expect(ids).toContain('futur_rfr_changement_regime');
    expect(ids).not.toContain('futur_prelevementliberatoire_eligible');
  });

  it('should include futur_prelevementliberatoire_eligible when RFR/parts <= 29315', () => {
    const ctx = futurCtx({ rfr_n_minus_2: 20000 }, { tax_parts: 1 });
    const ids = getCardIds(generator, ctx);

    expect(ids).toContain('futur_prelevementliberatoire_eligible');
    expect(ids).not.toContain('futur_rfr_changement_regime');
  });

  it('should include futur_prelevementliberatoire_eligible when RFR is 0 (default)', () => {
    const ids = getCardIds(generator, futurCtx());

    expect(ids).toContain('futur_prelevementliberatoire_eligible');
  });

  // ── Abattement ────────────────────────────────────────────────────────

  it('should always include futur_abattement_explication', () => {
    const ids = getCardIds(generator, futurCtx());

    expect(ids).toContain('futur_abattement_explication');
  });

  // ── TVA ───────────────────────────────────────────────────────────────

  it('should always include futur_tva_franchise_explication', () => {
    const ids = getCardIds(generator, futurCtx());

    expect(ids).toContain('futur_tva_franchise_explication');
  });

  it('should use BUY_SELL TVA thresholds when bic_bnc_type is BUY_SELL', () => {
    const ctx = futurCtx(
      { bic_bnc_type: BicBncType.BUY_SELL, ca_estimation_n_plus_1: 50000 },
      { bic_bnc_type: BicBncType.BUY_SELL },
    );
    const { items } = generateWithIds(generator, ctx);

    const tvaCard = items.find(
      (i: Partial<{ title: string; content: string }>) =>
        i.title?.includes('TVA') || i.content?.includes('tva_seuil'),
    );
    // BUY_SELL thresholds are 91900 / 101000
    expect(tvaCard).toBeDefined();
  });

  // ── ARE ───────────────────────────────────────────────────────────────

  it('should include futur_optimisation_arebasee when situation is EMPLOYEE', () => {
    const ctx = futurCtx({
      current_professional_situation: ProfessionalSituation.EMPLOYEE,
    });
    const ids = getCardIds(generator, ctx);

    expect(ids).toContain('futur_optimisation_arebasee');
  });

  it('should include futur_optimisation_arebasee when situation is UNEMPLOYED_COMPENSATED', () => {
    const ctx = futurCtx({
      current_professional_situation:
        ProfessionalSituation.UNEMPLOYED_COMPENSATED,
    });
    const ids = getCardIds(generator, ctx);

    expect(ids).toContain('futur_optimisation_arebasee');
  });

  it('should include futur_optimisation_arebasee when situation is null (default)', () => {
    const ctx = futurCtx();
    const ids = getCardIds(generator, ctx);

    expect(ids).toContain('futur_optimisation_arebasee');
  });

  it('should NOT include futur_optimisation_arebasee when situation is STUDENT', () => {
    const ctx = futurCtx({
      current_professional_situation: ProfessionalSituation.STUDENT,
    });
    const ids = getCardIds(generator, ctx);

    expect(ids).not.toContain('futur_optimisation_arebasee');
  });

  it('should NOT include futur_optimisation_arebasee when situation is OTHER', () => {
    const ctx = futurCtx({
      current_professional_situation: ProfessionalSituation.OTHER,
    });
    const ids = getCardIds(generator, ctx);

    expect(ids).not.toContain('futur_optimisation_arebasee');
  });
});
