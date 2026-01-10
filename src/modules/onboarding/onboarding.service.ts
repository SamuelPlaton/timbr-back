import { Injectable } from '@nestjs/common';
import { OnboardingApi } from './onboarding.api';
import { Onboarding } from '../../entities';

@Injectable()
export class OnboardingService {
  constructor(private onboardingApi: OnboardingApi) {}

  async findOne(filters: object = {}): Promise<Onboarding | null> {
    return this.onboardingApi.findOne(filters);
  }

  async findOneOrFail(filters: object = {}): Promise<Onboarding> {
    return this.onboardingApi.findOneOrFail(filters);
  }

  async create(params: Partial<Onboarding>): Promise<Onboarding> {
    return this.onboardingApi.create(params);
  }

  async update(
    onboarding: Onboarding,
    params: Partial<Onboarding>,
  ): Promise<Onboarding> {
    return this.onboardingApi.update(onboarding, params);
  }
}
