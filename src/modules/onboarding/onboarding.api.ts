import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Onboarding } from '../../entities';
import { QueryBuilder } from '../utils';

@Injectable()
export class OnboardingApi {
  constructor(
    @InjectRepository(Onboarding)
    private readonly repository: Repository<Onboarding>,
  ) {}

  public async findOne(filters: object = {}): Promise<Onboarding | null> {
    return new QueryBuilder<Onboarding>(this.repository, 'onboarding')
      .withRelations(['user'])
      .withFilters(filters)
      .findOne();
  }

  public async findOneOrFail(filters: object = {}): Promise<Onboarding> {
    return new QueryBuilder<Onboarding>(this.repository, 'onboarding')
      .withRelations(['user'])
      .withFilters(filters)
      .findOneOrFail();
  }

  public async create(params: Partial<Onboarding>): Promise<Onboarding> {
    const onboarding = this.repository.create(params);
    return await this.repository.save(onboarding);
  }

  public async update(
    onboarding: Onboarding,
    params: Partial<Onboarding>,
  ): Promise<Onboarding> {
    Object.assign(onboarding, params);
    return await this.repository.save(onboarding);
  }
}
