import { BicBncType } from '../../../../types/company-information.type';
import { MicroAuditGenerator } from '../adapters/micro.generator';
import { getCardIds } from './test-utils';
import {
  microCtx,
  currentYearStart,
  previousYearDate,
} from './audit-context.factory';

describe('MicroAuditGenerator', () => {
  let generator: MicroAuditGenerator;

  beforeEach(() => {
    generator = new MicroAuditGenerator();
  });

  // ── TNS / ACRE ────────────────────────────────────────────────────────

  it('should include tns_tva_guide_accre when has_acre is false', () => {
    const ids = getCardIds(generator, microCtx({ has_acre: false }));

    expect(ids).toContain('tns_tva_guide_accre');
  });

  it('should NOT include tns_tva_guide_accre when has_acre is true', () => {
    const ids = getCardIds(generator, microCtx({ has_acre: true }));

    expect(ids).not.toContain('tns_tva_guide_accre');
  });

  // ── Prélèvement libératoire — RFR threshold ──────────────────────────

  it('should include fiscalite_prelevements_liberatoires_danger when RFR/parts > 28797', () => {
    const ctx = microCtx({ rfr_n_minus_2: 30000 }, { tax_parts: 1 });
    const ids = getCardIds(generator, ctx);

    expect(ids).toContain('fiscalite_prelevements_liberatoires_danger');
    expect(ids).not.toContain('fiscalite_prelevements_acces_eligible');
  });

  it('should include fiscalite_prelevements_acces_eligible and calcul_gains when RFR/parts <= 28797', () => {
    const ctx = microCtx(
      { rfr_n_minus_2: 20000, ca_history_n: 40000 },
      { tax_parts: 1 },
    );
    const ids = getCardIds(generator, ctx);

    expect(ids).toContain('fiscalite_prelevements_acces_eligible');
    expect(ids).toContain('fiscalite_prelevements_calcul_gains');
    expect(ids).not.toContain('fiscalite_prelevements_liberatoires_danger');
  });

  // ── Always-shown fiscal cards ─────────────────────────────────────────

  it('should always include fiscalite_urssaf_declaration and micro_urssaf_plateformes_ca_facture', () => {
    const ids = getCardIds(generator, microCtx());

    expect(ids).toContain('fiscalite_urssaf_declaration');
    expect(ids).toContain('micro_urssaf_plateformes_ca_facture');
  });

  it('should always include micro_abattement_explication', () => {
    const ids = getCardIds(generator, microCtx());

    expect(ids).toContain('micro_abattement_explication');
  });

  // ── Professional expenses ─────────────────────────────────────────────

  it('should include fiscalite_reductions_entreprise_orange when expenses > 10000', () => {
    const ctx = microCtx({ professional_expenses_est: 15000 });
    const ids = getCardIds(generator, ctx);

    expect(ids).toContain('fiscalite_reductions_entreprise_orange');
  });

  it('should NOT include fiscalite_reductions_entreprise_orange when expenses <= 10000', () => {
    const ctx = microCtx({ professional_expenses_est: 5000 });
    const ids = getCardIds(generator, ctx);

    expect(ids).not.toContain('fiscalite_reductions_entreprise_orange');
  });

  // ── Plafond cotisations (85% of ceiling) ──────────────────────────────

  it('should include fiscalite_plafonds_cotisations when BNC CA > 85% of 77700', () => {
    const threshold = Math.ceil(77700 * 0.85) + 1; // 66046
    const ctx = microCtx(
      { ca_history_n: threshold },
      { bic_bnc_type: BicBncType.BNC },
    );
    const ids = getCardIds(generator, ctx);

    expect(ids).toContain('fiscalite_plafonds_cotisations');
  });

  it('should include fiscalite_plafonds_cotisations when BUY_SELL CA > 85% of 188700', () => {
    const threshold = Math.ceil(188700 * 0.85) + 1; // 160396
    const ctx = microCtx(
      { ca_history_n: threshold, bic_bnc_type: BicBncType.BUY_SELL },
      { bic_bnc_type: BicBncType.BUY_SELL },
    );
    const ids = getCardIds(generator, ctx);

    expect(ids).toContain('fiscalite_plafonds_cotisations');
  });

  it('should NOT include fiscalite_plafonds_cotisations when CA is well below ceiling', () => {
    const ctx = microCtx({ ca_history_n: 30000 });
    const ids = getCardIds(generator, ctx);

    expect(ids).not.toContain('fiscalite_plafonds_cotisations');
  });

  // ── TVA ───────────────────────────────────────────────────────────────

  it('should always include micro_seuil_tva_franchise', () => {
    const ids = getCardIds(generator, microCtx());

    expect(ids).toContain('micro_seuil_tva_franchise');
  });

  // ── Simulation / Transition ───────────────────────────────────────────

  it('should include simulation_micro_entreprise_status when CA < ceiling', () => {
    const ctx = microCtx({ ca_history_n: 30000 });
    const ids = getCardIds(generator, ctx);

    expect(ids).toContain('simulation_micro_entreprise_status');
  });

  it('should include micro_transition_vers_societe when CA > 50000', () => {
    const ctx = microCtx({ ca_history_n: 55000 });
    const ids = getCardIds(generator, ctx);

    expect(ids).toContain('micro_transition_vers_societe');
  });

  it('should NOT include micro_transition_vers_societe when CA <= 50000', () => {
    const ctx = microCtx({ ca_history_n: 30000 });
    const ids = getCardIds(generator, ctx);

    expect(ids).not.toContain('micro_transition_vers_societe');
  });

  // ── Retraite ──────────────────────────────────────────────────────────

  it('should include micro_retraite_zero_ca_risque when BNC CA < 10850', () => {
    const ctx = microCtx(
      { ca_history_n: 5000 },
      { bic_bnc_type: BicBncType.BNC },
    );
    const ids = getCardIds(generator, ctx);

    expect(ids).toContain('micro_retraite_zero_ca_risque');
  });

  it('should NOT include micro_retraite_zero_ca_risque when BNC CA >= 10850', () => {
    const ctx = microCtx(
      { ca_history_n: 15000 },
      { bic_bnc_type: BicBncType.BNC },
    );
    const ids = getCardIds(generator, ctx);

    expect(ids).not.toContain('micro_retraite_zero_ca_risque');
  });

  it('should include micro_per_epargne_retraite when taxable income/parts > 28797', () => {
    const ctx = microCtx({}, { taxable_yearly_income: 30000, tax_parts: 1 });
    const ids = getCardIds(generator, ctx);

    expect(ids).toContain('micro_per_epargne_retraite');
  });

  it('should NOT include micro_per_epargne_retraite when taxable income/parts <= 28797', () => {
    const ctx = microCtx({}, { taxable_yearly_income: 20000, tax_parts: 1 });
    const ids = getCardIds(generator, ctx);

    expect(ids).not.toContain('micro_per_epargne_retraite');
  });

  // ── Administratif ─────────────────────────────────────────────────────

  it('should include micro_cfe_cotisation_annuelle when creation year < current year', () => {
    const ctx = microCtx({}, { creation_date: previousYearDate() });
    const ids = getCardIds(generator, ctx);

    expect(ids).toContain('micro_cfe_cotisation_annuelle');
  });

  it('should NOT include micro_cfe_cotisation_annuelle when creation year is current year', () => {
    const ctx = microCtx({}, { creation_date: currentYearStart() });
    const ids = getCardIds(generator, ctx);

    expect(ids).not.toContain('micro_cfe_cotisation_annuelle');
  });

  it('should include micro_compte_bancaire_dedie when CA > 10000', () => {
    const ctx = microCtx({ ca_history_n: 15000 });
    const ids = getCardIds(generator, ctx);

    expect(ids).toContain('micro_compte_bancaire_dedie');
  });

  it('should NOT include micro_compte_bancaire_dedie when CA <= 10000', () => {
    const ctx = microCtx({ ca_history_n: 5000 });
    const ids = getCardIds(generator, ctx);

    expect(ids).not.toContain('micro_compte_bancaire_dedie');
  });
});
