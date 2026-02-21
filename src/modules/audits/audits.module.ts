import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audit } from '../../entities';
import { AuditsApi } from './audits.api';
import { AuditsService } from './audits.service';
import { AuditsController } from './audits.controller';
import { AuditGenerator } from './generators/audit.generator';
import { CommonAuditGenerator } from './generators/adapters/common.generator';
import { FuturAuditGenerator } from './generators/adapters/futur.generator';
import { MicroAuditGenerator } from './generators/adapters/micro.generator';
import { SocieteAuditGenerator } from './generators/adapters/societe.generator';
import { UsersModule } from '../users/users.module';
import { OnboardingModule } from '../onboarding/onboarding.module';

@Module({
  imports: [TypeOrmModule.forFeature([Audit]), UsersModule, OnboardingModule],
  providers: [
    AuditsApi,
    AuditsService,
    AuditGenerator,
    CommonAuditGenerator,
    FuturAuditGenerator,
    MicroAuditGenerator,
    SocieteAuditGenerator,
  ],
  controllers: [AuditsController],
  exports: [AuditsApi, AuditsService],
})
export class AuditsModule {}
