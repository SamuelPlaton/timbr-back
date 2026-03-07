import { Injectable } from '@nestjs/common';
import { AuditItem, Situation } from '../../../entities';
import {
  BicBncType,
  CompanyInformation,
  FutureFreelanceInformation,
  MaritalStatus,
  MicroCompanyInformation,
  SocietyInformation,
} from '../../../types/company-information.type';
import { AuditContext } from './audit-context.type';
import { CommonAuditGenerator } from './adapters/common.generator';
import { FuturAuditGenerator } from './adapters/futur.generator';
import { MicroAuditGenerator } from './adapters/micro.generator';
import { SocieteAuditGenerator } from './adapters/societe.generator';

// Micro-entreprise flat-rate cost abattement rates by activity type
const ABATTEMENT: Record<BicBncType, number> = {
  [BicBncType.BUY_SELL]: 0.71,
  [BicBncType.BIC]: 0.5,
  [BicBncType.BNC]: 0.34,
};

@Injectable()
export class AuditGenerator {
  constructor(
    private readonly common: CommonAuditGenerator,
    private readonly futur: FuturAuditGenerator,
    private readonly micro: MicroAuditGenerator,
    private readonly societe: SocieteAuditGenerator,
  ) {}

  generate(companyInfo: CompanyInformation): Partial<AuditItem>[] {
    const ctx = this.buildAuditContext(companyInfo);
    const items: Partial<AuditItem>[] = [];

    switch (ctx.situation) {
      case Situation.FUTUR:
        items.push(...this.futur.generate(ctx));
        break;
      case Situation.MICRO:
        items.push(...this.micro.generate(ctx));
        break;
      case Situation.SOCIETE:
        items.push(...this.societe.generate(ctx));
        break;
    }

    items.push(...this.common.generate(ctx));

    return items.sort((a, b) => (a.priority ?? 5) - (b.priority ?? 5));
  }

  // ── Context builder ───────────────────────────────────────────────────

  private buildAuditContext(companyInfo: CompanyInformation): AuditContext {
    const situation = this.normalizeSituation(companyInfo.situation);

    const futur =
      situation === Situation.FUTUR
        ? (companyInfo as {
            situation: Situation.FUTUR;
          } & FutureFreelanceInformation)
        : null;

    const micro =
      situation === Situation.MICRO
        ? (companyInfo as {
            situation: Situation.MICRO;
          } & MicroCompanyInformation)
        : null;

    const societe =
      situation === Situation.SOCIETE
        ? (companyInfo as { situation: Situation.SOCIETE } & SocietyInformation)
        : null;

    const bic_bnc_type = futur?.bic_bnc_type ?? micro?.bic_bnc_type ?? null;

    const yearly_income = this.computeYearlyIncome({ futur, micro, societe });
    const taxable_yearly_income = this.computeTaxableYearlyIncome({
      futur,
      micro,
      societe,
      bic_bnc_type,
      yearly_income,
    });

    return {
      situation,
      yearly_income,
      taxable_yearly_income,
      tax_parts: this.computeTaxParts({ micro, societe }),
      siren: micro?.siren ?? societe?.siren ?? '',
      creation_date: micro?.creation_date ?? societe?.creation_date ?? '',
      bic_bnc_type,
      onboarding: { futur, micro, societe },
    };
  }

  /** Raw gross income — no abattement applied. */
  private computeYearlyIncome({
    futur,
    micro,
    societe,
  }: {
    futur: FutureFreelanceInformation | null;
    micro: MicroCompanyInformation | null;
    societe: SocietyInformation | null;
  }): number {
    if (societe) return (societe.monthly_salary ?? 0) * 12;
    if (micro) return micro.ca_history_n ?? 0;
    if (futur) return futur.ca_estimation_n_plus_1 ?? 0;
    return 0;
  }

  /** Taxable income after flat-rate abattement (FUTUR/MICRO), or raw salary for SOCIETE. */
  private computeTaxableYearlyIncome({
    futur,
    micro,
    societe,
    bic_bnc_type,
    yearly_income,
  }: {
    futur: FutureFreelanceInformation | null;
    micro: MicroCompanyInformation | null;
    societe: SocietyInformation | null;
    bic_bnc_type: BicBncType | null;
    yearly_income: number;
  }): number {
    if (societe) return yearly_income;
    if ((futur || micro) && bic_bnc_type) {
      return yearly_income * (1 - ABATTEMENT[bic_bnc_type]);
    }
    return yearly_income;
  }

  /**
   * Fiscal parts (quotient familial).
   * - Micro: direct value from onboarding (user-declared).
   * - Société: computed from marital_status + children_count.
   * - Futur: defaults to 1 (no declaration available at onboarding stage).
   */
  private computeTaxParts({
    micro,
    societe,
  }: {
    micro: MicroCompanyInformation | null;
    societe: SocietyInformation | null;
  }): number {
    if (micro) return micro.tax_parts ?? 1;
    if (societe) {
      const base =
        societe.marital_status === MaritalStatus.MARRIED ||
        societe.marital_status === MaritalStatus.PACS
          ? 2
          : 1;
      const n = societe.children_count ?? 0;
      // First 2 children: +0.5 each. From 3rd onward: +1 each.
      const childParts = n <= 2 ? n * 0.5 : 1 + (n - 2);
      return base + childParts;
    }
    return 1;
  }

  // ── Situation normalisation ───────────────────────────────────────────

  /**
   * Normalises a raw situation string (coming from onboarding) into the Situation enum.
   * The front-end may send various casings or full labels — this handles known variants.
   *
   * TODO: enforce Situation enum directly in onboarding DTO validation once front-end
   * is aligned, and remove this normalisation layer.
   */
  private normalizeSituation(situation?: string): Situation {
    const s = situation?.toLowerCase().trim() ?? '';

    if (s === Situation.FUTUR || s === 'future' || s.startsWith('futur')) {
      return Situation.FUTUR;
    }
    if (s === Situation.MICRO || s.startsWith('micro')) {
      return Situation.MICRO;
    }
    if (
      s === Situation.SOCIETE ||
      s === 'société' ||
      s === 'societe' ||
      s === 'society' ||
      s.startsWith('sarl') ||
      s.startsWith('sasu') ||
      s.startsWith('sas')
    ) {
      return Situation.SOCIETE;
    }

    return Situation.FUTUR;
  }
}
