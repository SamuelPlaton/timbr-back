import {
  LegalForm,
  ProfessionalSituation,
} from '../../../../types/company-information.type';
import { SocieteAuditGenerator } from '../adapters/societe.generator';
import { getCardIds } from './test-utils';
import { societeCtx, daysAgo } from './audit-context.factory';

describe('SocieteAuditGenerator', () => {
  let generator: SocieteAuditGenerator;

  beforeEach(() => {
    generator = new SocieteAuditGenerator();
  });

  // ── Social ────────────────────────────────────────────────────────────

  it('should include social_sas_sasu_protection_sociale for SASU', () => {
    const ids = getCardIds(
      generator,
      societeCtx({ legal_form: LegalForm.SASU }),
    );

    expect(ids).toContain('social_sas_sasu_protection_sociale');
    expect(ids).not.toContain('societe_eurl_sarl_statut_tns');
  });

  it('should include societe_eurl_sarl_statut_tns for EURL', () => {
    const ids = getCardIds(
      generator,
      societeCtx({ legal_form: LegalForm.EURL }),
    );

    expect(ids).toContain('societe_eurl_sarl_statut_tns');
    expect(ids).not.toContain('social_sas_sasu_protection_sociale');
  });

  it('should include social_rapport_estimation_revenus when monthly_salary > 0', () => {
    const ids = getCardIds(
      generator,
      societeCtx({ monthly_salary: 3000, legal_form: LegalForm.SASU }),
    );

    expect(ids).toContain('social_rapport_estimation_revenus');
  });

  it('should NOT include social_rapport_estimation_revenus when monthly_salary is 0', () => {
    const ids = getCardIds(
      generator,
      societeCtx({ monthly_salary: 0, legal_form: LegalForm.SASU }),
    );

    expect(ids).not.toContain('social_rapport_estimation_revenus');
  });

  it('should always include societe_optimisation_remuneration', () => {
    const ids = getCardIds(
      generator,
      societeCtx({ legal_form: LegalForm.SASU }),
    );

    expect(ids).toContain('societe_optimisation_remuneration');
  });

  it('should include social_sasu_dividendes for SASU with CA > 77700', () => {
    const ids = getCardIds(
      generator,
      societeCtx({ legal_form: LegalForm.SASU, ca_est_n: 80000 }),
    );

    expect(ids).toContain('social_sasu_dividendes');
  });

  it('should NOT include social_sasu_dividendes for SASU with CA <= 77700', () => {
    const ids = getCardIds(
      generator,
      societeCtx({ legal_form: LegalForm.SASU, ca_est_n: 50000 }),
    );

    expect(ids).not.toContain('social_sasu_dividendes');
  });

  // ── ACRE ──────────────────────────────────────────────────────────────

  it('should include societe_acre_eligibilite when !has_acre and within 45 days', () => {
    const ids = getCardIds(
      generator,
      societeCtx(
        { has_acre: false, legal_form: LegalForm.SASU },
        { creation_date: daysAgo(10) },
      ),
    );

    expect(ids).toContain('societe_acre_eligibilite');
  });

  it('should NOT include societe_acre_eligibilite when has_acre is true', () => {
    const ids = getCardIds(
      generator,
      societeCtx(
        { has_acre: true, legal_form: LegalForm.SASU },
        { creation_date: daysAgo(10) },
      ),
    );

    expect(ids).not.toContain('societe_acre_eligibilite');
  });

  it('should NOT include societe_acre_eligibilite when creation > 45 days ago', () => {
    const ids = getCardIds(
      generator,
      societeCtx(
        { has_acre: false, legal_form: LegalForm.SASU },
        { creation_date: daysAgo(60) },
      ),
    );

    expect(ids).not.toContain('societe_acre_eligibilite');
  });

  it('should include societe_acre_eligibilite when no creation_date', () => {
    const ids = getCardIds(
      generator,
      societeCtx({ has_acre: false, legal_form: LegalForm.SASU }),
    );

    expect(ids).toContain('societe_acre_eligibilite');
  });

  // ── Retraite SASU ─────────────────────────────────────────────────────

  it('should include retraite_sasu_declaration_arebasee for SASU with previously employed', () => {
    const ids = getCardIds(
      generator,
      societeCtx({
        legal_form: LegalForm.SASU,
        previous_professional_situation: ProfessionalSituation.EMPLOYEE,
      }),
    );

    expect(ids).toContain('retraite_sasu_declaration_arebasee');
  });

  it('should include retraite_sasu_explication_trimestres for SASU', () => {
    const ids = getCardIds(
      generator,
      societeCtx({
        legal_form: LegalForm.SASU,
        monthly_salary: 2000,
      }),
    );

    expect(ids).toContain('retraite_sasu_explication_trimestres');
  });

  it('should include retraite_validation_prelevements_personnel for SASU with low salary', () => {
    const ids = getCardIds(
      generator,
      societeCtx({
        legal_form: LegalForm.SASU,
        monthly_salary: 300,
      }),
    );

    expect(ids).toContain('retraite_validation_prelevements_personnel');
  });

  it('should NOT include retraite_validation_prelevements_personnel for SASU with sufficient salary', () => {
    const ids = getCardIds(
      generator,
      societeCtx({
        legal_form: LegalForm.SASU,
        monthly_salary: 3000,
      }),
    );

    expect(ids).not.toContain('retraite_validation_prelevements_personnel');
  });

  it('should include societe_per_dirigeant for SASU when income/parts > 29580', () => {
    const ids = getCardIds(
      generator,
      societeCtx(
        { legal_form: LegalForm.SASU },
        { taxable_yearly_income: 35000, tax_parts: 1 },
      ),
    );

    expect(ids).toContain('societe_per_dirigeant');
  });

  it('should NOT include societe_per_dirigeant for SASU when income/parts <= 29580', () => {
    const ids = getCardIds(
      generator,
      societeCtx(
        { legal_form: LegalForm.SASU },
        { taxable_yearly_income: 25000, tax_parts: 1 },
      ),
    );

    expect(ids).not.toContain('societe_per_dirigeant');
  });

  // ── Retraite EURL/SARL ────────────────────────────────────────────────

  it('should include retraite_eurl_sarl_explication_trimestres for EURL', () => {
    const ids = getCardIds(
      generator,
      societeCtx({ legal_form: LegalForm.EURL }),
    );

    expect(ids).toContain('retraite_eurl_sarl_explication_trimestres');
  });

  it('should include retraite_eurl_sarl_risque_trimestres for EURL with low salary', () => {
    const ids = getCardIds(
      generator,
      societeCtx({
        legal_form: LegalForm.EURL,
        monthly_salary: 300,
      }),
    );

    expect(ids).toContain('retraite_eurl_sarl_risque_trimestres');
  });

  it('should include societe_per_dirigeant_eurl for EURL when income/parts > 29580', () => {
    const ids = getCardIds(
      generator,
      societeCtx(
        { legal_form: LegalForm.EURL },
        { taxable_yearly_income: 35000, tax_parts: 1 },
      ),
    );

    expect(ids).toContain('societe_per_dirigeant_eurl');
  });

  // ── Démission ─────────────────────────────────────────────────────────

  it('should include demission_are_chomage when previously employed', () => {
    const ids = getCardIds(
      generator,
      societeCtx({
        legal_form: LegalForm.SASU,
        previous_professional_situation: ProfessionalSituation.EMPLOYEE,
      }),
    );

    expect(ids).toContain('demission_are_chomage');
  });

  it('should NOT include demission_are_chomage when not previously employed', () => {
    const ids = getCardIds(
      generator,
      societeCtx({
        legal_form: LegalForm.SASU,
        previous_professional_situation: ProfessionalSituation.STUDENT,
      }),
    );

    expect(ids).not.toContain('demission_are_chomage');
  });

  it('should include demission_sasu_conseil_versement for SASU', () => {
    const ids = getCardIds(
      generator,
      societeCtx({ legal_form: LegalForm.SASU }),
    );

    expect(ids).toContain('demission_sasu_conseil_versement');
  });

  it('should NOT include demission_sasu_conseil_versement for EURL', () => {
    const ids = getCardIds(
      generator,
      societeCtx({ legal_form: LegalForm.EURL }),
    );

    expect(ids).not.toContain('demission_sasu_conseil_versement');
  });

  // ── ARE ───────────────────────────────────────────────────────────────

  it('should include are_chomage_optimisation_arebasee when previously employed', () => {
    const ids = getCardIds(
      generator,
      societeCtx({
        legal_form: LegalForm.SASU,
        previous_professional_situation:
          ProfessionalSituation.UNEMPLOYED_COMPENSATED,
      }),
    );

    expect(ids).toContain('are_chomage_optimisation_arebasee');
  });

  it('should include are_chomage_conseil_expert for SASU', () => {
    const ids = getCardIds(
      generator,
      societeCtx({ legal_form: LegalForm.SASU }),
    );

    expect(ids).toContain('are_chomage_conseil_expert');
  });

  // ── AGE ───────────────────────────────────────────────────────────────

  it('should include age_maintenir_are when previously employed', () => {
    const ids = getCardIds(
      generator,
      societeCtx({
        legal_form: LegalForm.SASU,
        previous_professional_situation: ProfessionalSituation.EMPLOYEE,
      }),
    );

    expect(ids).toContain('age_maintenir_are');
  });

  it('should NOT include age_maintenir_are when not previously employed', () => {
    const ids = getCardIds(
      generator,
      societeCtx({
        legal_form: LegalForm.SASU,
        previous_professional_situation: ProfessionalSituation.OTHER,
      }),
    );

    expect(ids).not.toContain('age_maintenir_are');
  });

  // ── TVA ───────────────────────────────────────────────────────────────

  it('should include tva_choix_regime_micro when CA < 36800', () => {
    const ids = getCardIds(
      generator,
      societeCtx({ legal_form: LegalForm.SASU, ca_est_n: 20000 }),
    );

    expect(ids).toContain('tva_choix_regime_micro');
  });

  it('should NOT include tva_choix_regime_micro when CA >= 36800', () => {
    const ids = getCardIds(
      generator,
      societeCtx({ legal_form: LegalForm.SASU, ca_est_n: 40000 }),
    );

    expect(ids).not.toContain('tva_choix_regime_micro');
  });

  it('should include tva_sasu_sasu_conseil_expert for SASU', () => {
    const ids = getCardIds(
      generator,
      societeCtx({ legal_form: LegalForm.SAS }),
    );

    expect(ids).toContain('tva_sasu_sasu_conseil_expert');
  });

  // ── Fiscalité ─────────────────────────────────────────────────────────

  it('should always include societe_frais_deductibles, societe_compte_courant_associe, societe_choix_is_ir', () => {
    const ids = getCardIds(
      generator,
      societeCtx({ legal_form: LegalForm.SASU }),
    );

    expect(ids).toContain('societe_frais_deductibles');
    expect(ids).toContain('societe_compte_courant_associe');
    expect(ids).toContain('societe_choix_is_ir');
  });

  it('should include societe_cfe_cotisation when creation year < current year', () => {
    const previousYear = `${new Date().getFullYear() - 1}-06-15`;
    const ids = getCardIds(
      generator,
      societeCtx(
        { legal_form: LegalForm.SASU },
        { creation_date: previousYear },
      ),
    );

    expect(ids).toContain('societe_cfe_cotisation');
  });

  it('should NOT include societe_cfe_cotisation when creation year is current year', () => {
    const currentYear = `${new Date().getFullYear()}-03-01`;
    const ids = getCardIds(
      generator,
      societeCtx(
        { legal_form: LegalForm.SASU },
        { creation_date: currentYear },
      ),
    );

    expect(ids).not.toContain('societe_cfe_cotisation');
  });

  it('should always include societe_liasse_fiscale_comptes and societe_mecenat_competences', () => {
    const ids = getCardIds(
      generator,
      societeCtx({ legal_form: LegalForm.SASU }),
    );

    expect(ids).toContain('societe_liasse_fiscale_comptes');
    expect(ids).toContain('societe_mecenat_competences');
  });

  // ── Patrimoine ────────────────────────────────────────────────────────

  it('should always include societe_compte_titre_entreprise', () => {
    const ids = getCardIds(
      generator,
      societeCtx({ legal_form: LegalForm.SASU }),
    );

    expect(ids).toContain('societe_compte_titre_entreprise');
  });

  it('should include societe_holding_investissement when CA > 80000', () => {
    const ids = getCardIds(
      generator,
      societeCtx({ legal_form: LegalForm.SASU, ca_est_n: 90000 }),
    );

    expect(ids).toContain('societe_holding_investissement');
  });

  it('should NOT include societe_holding_investissement when CA <= 80000', () => {
    const ids = getCardIds(
      generator,
      societeCtx({ legal_form: LegalForm.SASU, ca_est_n: 50000 }),
    );

    expect(ids).not.toContain('societe_holding_investissement');
  });

  it('should include societe_holding_saas_eurl for EURL', () => {
    const ids = getCardIds(
      generator,
      societeCtx({ legal_form: LegalForm.EURL }),
    );

    expect(ids).toContain('societe_holding_saas_eurl');
  });

  it('should include societe_holding_saas_eurl for SARL', () => {
    const ids = getCardIds(
      generator,
      societeCtx({ legal_form: LegalForm.SARL }),
    );

    expect(ids).toContain('societe_holding_saas_eurl');
  });

  it('should NOT include societe_holding_saas_eurl for SASU', () => {
    const ids = getCardIds(
      generator,
      societeCtx({ legal_form: LegalForm.SASU }),
    );

    expect(ids).not.toContain('societe_holding_saas_eurl');
  });
});
