import { Injectable } from '@nestjs/common';
import { AuditItem, Situation } from '../../../entities';
import { CompanyInformation } from '../../../types/company-information.type';
import { CommonAuditGenerator } from './adapters/common.generator';
import { FuturAuditGenerator } from './adapters/futur.generator';
import { MicroAuditGenerator } from './adapters/micro.generator';
import { SocieteAuditGenerator } from './adapters/societe.generator';

@Injectable()
export class AuditGenerator {
  constructor(
    private readonly common: CommonAuditGenerator,
    private readonly futur: FuturAuditGenerator,
    private readonly micro: MicroAuditGenerator,
    private readonly societe: SocieteAuditGenerator,
  ) {}

  generate(companyInfo: CompanyInformation): Partial<AuditItem>[] {
    const situation = this.normalizeSituation(companyInfo.situation);
    const items: Partial<AuditItem>[] = [];

    switch (situation) {
      case Situation.FUTUR:
        items.push(...this.futur.generate(companyInfo));
        break;
      case Situation.MICRO:
        items.push(...this.micro.generate(companyInfo));
        break;
      case Situation.SOCIETE:
        items.push(...this.societe.generate(companyInfo));
        break;
    }

    items.push(...this.common.generate(companyInfo));

    return items.sort((a, b) => (a.priority ?? 5) - (b.priority ?? 5));
  }

  /**
   * Normalises a raw situation string (coming from onboarding) into the Situation enum.
   * The front-end may send various casings or full labels — this handles known variants.
   *
   * TODO: enforce Situation enum directly in onboarding DTO validation once front-end
   * is aligned, and remove this normalisation layer.
   */
  private normalizeSituation(situation?: string): Situation | null {
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

    return null;
  }
}
