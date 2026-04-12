import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuditsApi } from './audits.api';
import { Audit } from '../../entities';
import { AuditGenerator } from './generators/audit.generator';
import { CompanyInformation } from '../../types/company-information.type';
import { User } from '../../entities';
import { OnboardingService } from '../onboarding';
import { TokenUsageService } from '../users/token-usage.service';
import {
  Feature,
  hasFeatureAccess,
  getAuditLimit,
  SubscriptionTier,
} from '../../config/subscription.config';

@Injectable()
export class AuditsService {
  private static readonly SUGGESTED_UPGRADE: Record<
    SubscriptionTier,
    string | null
  > = {
    [SubscriptionTier.FREE]: 'Solo',
    [SubscriptionTier.SOLO]: 'Boost',
    [SubscriptionTier.BOOST]: 'Elite',
    [SubscriptionTier.ELITE]: null,
  };

  constructor(
    private auditsApi: AuditsApi,
    private auditGenerator: AuditGenerator,
    private onboardingService: OnboardingService,
    private tokenUsageService: TokenUsageService,
  ) {}

  async checkAuditEligibility(userId: string): Promise<void> {
    const tier = await this.tokenUsageService.getUserTier(userId);

    if (!hasFeatureAccess(tier, Feature.AUDIT_ACCESS)) {
      throw new ForbiddenException({
        statusCode: 403,
        code: 'AUDIT_ACCESS_DENIED',
        message:
          'Les audits ne sont pas disponibles avec votre abonnement actuel. Passez à un plan supérieur pour en bénéficier.',
        current_tier: tier,
        suggested_plan: AuditsService.SUGGESTED_UPGRADE[tier],
      });
    }

    const limit = getAuditLimit(tier);
    if (limit !== Infinity) {
      const used = await this.auditsApi.countUserAuditsThisMonth(userId);
      if (used >= limit) {
        throw new ForbiddenException({
          statusCode: 403,
          code: 'AUDIT_LIMIT_EXCEEDED',
          message: `Vous avez atteint votre limite de ${limit} audit${limit > 1 ? 's' : ''} ce mois-ci.`,
          current_tier: tier,
          used,
          limit,
          suggested_plan: AuditsService.SUGGESTED_UPGRADE[tier],
        });
      }
    }
  }

  async findAll(filters: object = {}): Promise<Audit[]> {
    return this.auditsApi.findAll(filters);
  }

  async findOne(filters: object = {}): Promise<Audit | null> {
    return this.auditsApi.findOne(filters);
  }

  async findOneOrFail(filters: object = {}): Promise<Audit> {
    return this.auditsApi.findOneOrFail(filters);
  }

  async generateAudit(
    user: User,
    providedCompanyInfo?: Record<string, any>,
  ): Promise<Audit> {
    let companyInformation: CompanyInformation;

    if (providedCompanyInfo) {
      // Use the provided company information (simulation mode)
      companyInformation = providedCompanyInfo as CompanyInformation;
    } else {
      // Get user's onboarding data
      const onboarding = await this.onboardingService.findOne({
        user: { id: user.id },
      });

      if (!onboarding) {
        throw new Error('Onboarding data not found');
      }

      // Merge the situation discriminant (separate column) with the raw JSONB blob
      // to form the typed CompanyInformation used by the audit generator.
      companyInformation = {
        situation: onboarding.situation,
        ...onboarding.company_information,
      } as CompanyInformation;
    }

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
