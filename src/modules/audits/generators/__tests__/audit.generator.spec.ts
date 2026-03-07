import { Situation } from '../../../../entities';
import {
  BicBncType,
  MaritalStatus,
} from '../../../../types/company-information.type';
import { AuditGenerator } from '../audit.generator';
import { CommonAuditGenerator } from '../adapters/common.generator';
import { FuturAuditGenerator } from '../adapters/futur.generator';
import { MicroAuditGenerator } from '../adapters/micro.generator';
import { SocieteAuditGenerator } from '../adapters/societe.generator';

describe('AuditGenerator', () => {
  let generator: AuditGenerator;

  beforeEach(() => {
    generator = new AuditGenerator(
      new CommonAuditGenerator(),
      new FuturAuditGenerator(),
      new MicroAuditGenerator(),
      new SocieteAuditGenerator(),
    );
  });

  // ── normalizeSituation ────────────────────────────────────────────────

  describe('normalizeSituation', () => {
    const normalize = (s: string) =>
      (generator as any).normalizeSituation(s) as Situation;

    it('should return FUTUR for "futur"', () => {
      expect(normalize('futur')).toBe(Situation.FUTUR);
    });

    it('should return FUTUR for "future"', () => {
      expect(normalize('future')).toBe(Situation.FUTUR);
    });

    it('should return FUTUR for "futur_freelance"', () => {
      expect(normalize('futur_freelance')).toBe(Situation.FUTUR);
    });

    it('should return MICRO for "micro"', () => {
      expect(normalize('micro')).toBe(Situation.MICRO);
    });

    it('should return MICRO for "micro-entreprise"', () => {
      expect(normalize('micro-entreprise')).toBe(Situation.MICRO);
    });

    it('should return SOCIETE for "societe"', () => {
      expect(normalize('societe')).toBe(Situation.SOCIETE);
    });

    it('should return SOCIETE for "société" (accented)', () => {
      expect(normalize('société')).toBe(Situation.SOCIETE);
    });

    it('should return SOCIETE for "society"', () => {
      expect(normalize('society')).toBe(Situation.SOCIETE);
    });

    it('should return SOCIETE for "sarl..."', () => {
      expect(normalize('sarl_unipersonnelle')).toBe(Situation.SOCIETE);
    });

    it('should return SOCIETE for "sasu..."', () => {
      expect(normalize('sasu')).toBe(Situation.SOCIETE);
    });

    it('should return SOCIETE for "sas..."', () => {
      expect(normalize('sas_enterprise')).toBe(Situation.SOCIETE);
    });

    it('should default to FUTUR for unknown input', () => {
      expect(normalize('unknown')).toBe(Situation.FUTUR);
    });

    it('should default to FUTUR for empty string', () => {
      expect(normalize('')).toBe(Situation.FUTUR);
    });

    it('should default to FUTUR for undefined', () => {
      expect(normalize(undefined as any)).toBe(Situation.FUTUR);
    });

    it('should handle uppercase input', () => {
      expect(normalize('MICRO')).toBe(Situation.MICRO);
    });
  });

  // ── computeTaxParts ───────────────────────────────────────────────────

  describe('computeTaxParts', () => {
    const compute = (params: {
      micro?: Record<string, unknown> | null;
      societe?: Record<string, unknown> | null;
    }) => (generator as any).computeTaxParts(params) as number;

    it('should return micro.tax_parts when micro is provided', () => {
      expect(compute({ micro: { tax_parts: 2.5 } })).toBe(2.5);
    });

    it('should default to 1 when micro has no tax_parts', () => {
      expect(compute({ micro: {} })).toBe(1);
    });

    it('should return 2 base parts for married societe', () => {
      expect(
        compute({
          societe: { marital_status: MaritalStatus.MARRIED, children_count: 0 },
        }),
      ).toBe(2);
    });

    it('should return 2 base parts for PACS societe', () => {
      expect(
        compute({
          societe: { marital_status: MaritalStatus.PACS, children_count: 0 },
        }),
      ).toBe(2);
    });

    it('should return 1 base part for single societe', () => {
      expect(
        compute({
          societe: {
            marital_status: MaritalStatus.SINGLE,
            children_count: 0,
          },
        }),
      ).toBe(1);
    });

    it('should return 1 base part for divorced societe', () => {
      expect(
        compute({
          societe: {
            marital_status: MaritalStatus.DIVORCED,
            children_count: 0,
          },
        }),
      ).toBe(1);
    });

    it('should return 1 base part for widowed societe', () => {
      expect(
        compute({
          societe: {
            marital_status: MaritalStatus.WIDOWED,
            children_count: 0,
          },
        }),
      ).toBe(1);
    });

    it('should add 0.5 per child for first 2 children', () => {
      expect(
        compute({
          societe: {
            marital_status: MaritalStatus.SINGLE,
            children_count: 2,
          },
        }),
      ).toBe(2); // 1 + 0.5 + 0.5
    });

    it('should add 1 per child from 3rd onward', () => {
      expect(
        compute({
          societe: {
            marital_status: MaritalStatus.MARRIED,
            children_count: 3,
          },
        }),
      ).toBe(4); // 2 + 0.5 + 0.5 + 1
    });

    it('should handle 4 children correctly', () => {
      expect(
        compute({
          societe: {
            marital_status: MaritalStatus.SINGLE,
            children_count: 4,
          },
        }),
      ).toBe(4); // 1 + 0.5 + 0.5 + 1 + 1
    });

    it('should default to 1 when neither micro nor societe provided', () => {
      expect(compute({ micro: null, societe: null })).toBe(1);
    });
  });

  // ── computeYearlyIncome ───────────────────────────────────────────────

  describe('computeYearlyIncome', () => {
    const compute = (params: {
      futur?: Record<string, unknown> | null;
      micro?: Record<string, unknown> | null;
      societe?: Record<string, unknown> | null;
    }) => (generator as any).computeYearlyIncome(params) as number;

    it('should return monthly_salary * 12 for societe', () => {
      expect(compute({ societe: { monthly_salary: 3000 } })).toBe(36000);
    });

    it('should return ca_history_n for micro', () => {
      expect(compute({ micro: { ca_history_n: 45000 } })).toBe(45000);
    });

    it('should return ca_estimation_n_plus_1 for futur', () => {
      expect(compute({ futur: { ca_estimation_n_plus_1: 30000 } })).toBe(30000);
    });

    it('should return 0 when all null', () => {
      expect(compute({ futur: null, micro: null, societe: null })).toBe(0);
    });

    it('should return 0 when societe has no monthly_salary', () => {
      expect(compute({ societe: {} })).toBe(0);
    });

    it('should prioritize societe over micro', () => {
      expect(
        compute({
          societe: { monthly_salary: 5000 },
          micro: { ca_history_n: 20000 },
        }),
      ).toBe(60000);
    });
  });

  // ── computeTaxableYearlyIncome ────────────────────────────────────────

  describe('computeTaxableYearlyIncome', () => {
    const compute = (params: {
      futur?: Record<string, unknown> | null;
      micro?: Record<string, unknown> | null;
      societe?: Record<string, unknown> | null;
      bic_bnc_type: BicBncType | null;
      yearly_income: number;
    }) => (generator as any).computeTaxableYearlyIncome(params) as number;

    it('should return raw income for societe (no abattement)', () => {
      expect(
        compute({
          societe: {},
          bic_bnc_type: null,
          yearly_income: 50000,
        }),
      ).toBe(50000);
    });

    it('should apply 34% abattement for BNC micro', () => {
      expect(
        compute({
          micro: {},
          bic_bnc_type: BicBncType.BNC,
          yearly_income: 100000,
        }),
      ).toBeCloseTo(66000); // 100000 * (1 - 0.34)
    });

    it('should apply 50% abattement for BIC micro', () => {
      expect(
        compute({
          micro: {},
          bic_bnc_type: BicBncType.BIC,
          yearly_income: 100000,
        }),
      ).toBe(50000);
    });

    it('should apply 71% abattement for BUY_SELL micro', () => {
      expect(
        compute({
          micro: {},
          bic_bnc_type: BicBncType.BUY_SELL,
          yearly_income: 100000,
        }),
      ).toBeCloseTo(29000); // 100000 * (1 - 0.71)
    });

    it('should apply abattement for futur with bic_bnc_type', () => {
      expect(
        compute({
          futur: {},
          bic_bnc_type: BicBncType.BNC,
          yearly_income: 50000,
        }),
      ).toBeCloseTo(33000); // 50000 * 0.66
    });

    it('should return raw income when bic_bnc_type is null', () => {
      expect(
        compute({
          micro: {},
          bic_bnc_type: null,
          yearly_income: 50000,
        }),
      ).toBe(50000);
    });
  });

  // ── Orchestration ─────────────────────────────────────────────────────

  describe('orchestration', () => {
    it('should produce items for FUTUR situation', () => {
      const items = generator.generate({
        situation: 'futur',
        bic_bnc_type: BicBncType.BNC,
      } as any);

      expect(items.length).toBeGreaterThan(0);
      // Should have both futur-specific and common cards
      const titles = items.map((i) => i.title);
      expect(titles.some((t) => t?.includes('structure'))).toBe(true);
    });

    it('should produce items for MICRO situation', () => {
      const items = generator.generate({
        situation: 'micro',
        bic_bnc_type: BicBncType.BNC,
        ca_history_n: 30000,
      } as any);

      expect(items.length).toBeGreaterThan(0);
    });

    it('should produce items for SOCIETE situation', () => {
      const items = generator.generate({
        situation: 'societe',
        legal_form: 'sasu',
        monthly_salary: 3000,
      } as any);

      expect(items.length).toBeGreaterThan(0);
    });

    it('should sort results by priority ascending', () => {
      const items = generator.generate({
        situation: 'micro',
        bic_bnc_type: BicBncType.BNC,
        ca_history_n: 30000,
      } as any);

      for (let i = 1; i < items.length; i++) {
        expect(items[i].priority).toBeGreaterThanOrEqual(
          items[i - 1].priority!,
        );
      }
    });

    it('should always include common cards regardless of situation', () => {
      const futurItems = generator.generate({
        situation: 'futur',
        bic_bnc_type: BicBncType.BNC,
      } as any);

      const microItems = generator.generate({
        situation: 'micro',
        bic_bnc_type: BicBncType.BNC,
      } as any);

      // Both should have common cards like factures
      const hasFuturFactures = futurItems.some((i) =>
        i.title?.toLowerCase().includes('factures'),
      );
      const hasMicroFactures = microItems.some((i) =>
        i.title?.toLowerCase().includes('factures'),
      );

      expect(hasFuturFactures).toBe(true);
      expect(hasMicroFactures).toBe(true);
    });
  });
});
