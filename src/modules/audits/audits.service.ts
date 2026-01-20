import { Injectable } from '@nestjs/common';
import { AuditsApi } from './audits.api';
import { Audit } from '../../entities';
import { AuditGenerator } from './audit.generator';
import { User } from '../../entities';
import { OnboardingService } from '../onboarding';

@Injectable()
export class AuditsService {
  constructor(
    private auditsApi: AuditsApi,
    private auditGenerator: AuditGenerator,
    private onboardingService: OnboardingService,
  ) {}

  async findAll(filters: object = {}): Promise<Audit[]> {
    return this.auditsApi.findAll(filters);
  }

  async findOne(filters: object = {}): Promise<Audit | null> {
    return this.auditsApi.findOne(filters);
  }

  async findOneOrFail(filters: object = {}): Promise<Audit> {
    return this.auditsApi.findOneOrFail(filters);
  }

  async generateAudit(user: User): Promise<Audit> {
    // Get user's onboarding data
    const onboarding = await this.onboardingService.findOne({
      user: { id: user.id },
    });

    if (!onboarding) {
      throw new Error('Onboarding data not found');
    }

    // Create snapshot of company_information
    const companyInformation = {
      situation: onboarding.situation,
      ...onboarding.company_information,
    };

    // Generate audit items based on company information
    const auditItems = this.auditGenerator.generate(companyInformation);

    // Create audit with items
    const audit = await this.auditsApi.create({
      user,
      company_information: companyInformation,
      audit_items: auditItems as any, // Cast needed for TypeORM cascade create
    });

    return audit;
  }
}
