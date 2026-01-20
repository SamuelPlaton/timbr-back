import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audit } from '../../entities';
import { AuditsApi } from './audits.api';
import { AuditsService } from './audits.service';
import { AuditsController } from './audits.controller';
import { AuditGenerator } from './audit.generator';
import { UsersModule } from '../users/users.module';
import { OnboardingModule } from '../onboarding/onboarding.module';

@Module({
  imports: [TypeOrmModule.forFeature([Audit]), UsersModule, OnboardingModule],
  providers: [AuditsApi, AuditsService, AuditGenerator],
  controllers: [AuditsController],
  exports: [AuditsApi, AuditsService],
})
export class AuditsModule {}
