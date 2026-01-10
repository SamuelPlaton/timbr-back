import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Onboarding } from '../../entities';
import { OnboardingApi } from './onboarding.api';
import { OnboardingService } from './onboarding.service';
import { OnboardingController } from './onboarding.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Onboarding]), UsersModule],
  providers: [OnboardingApi, OnboardingService],
  controllers: [OnboardingController],
  exports: [OnboardingApi, OnboardingService],
})
export class OnboardingModule {}
