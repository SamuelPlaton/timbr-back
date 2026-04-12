import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Audit } from '../../entities';
import { QueryBuilder } from '../utils';

@Injectable()
export class AuditsApi {
  constructor(
    @InjectRepository(Audit)
    private readonly repository: Repository<Audit>,
  ) {}

  public async findAll(filters: object = {}): Promise<Audit[]> {
    return new QueryBuilder<Audit>(this.repository, 'audit')
      .withRelations(['user', 'audit_items'])
      .withFilters(filters)
      .findMany();
  }

  public async findOne(filters: object = {}): Promise<Audit | null> {
    return new QueryBuilder<Audit>(this.repository, 'audit')
      .withRelations(['user', 'audit_items'])
      .withFilters(filters)
      .findOne();
  }

  public async findOneOrFail(filters: object = {}): Promise<Audit> {
    return new QueryBuilder<Audit>(this.repository, 'audit')
      .withRelations(['user', 'audit_items'])
      .withFilters(filters)
      .findOneOrFail();
  }

  public async create(params: Partial<Audit>): Promise<Audit> {
    const audit = this.repository.create(params);
    return await this.repository.save(audit);
  }

  public async countUserAuditsThisMonth(userId: string): Promise<number> {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    return this.repository
      .createQueryBuilder('audit')
      .where('audit.user_id = :userId', { userId })
      .andWhere('audit.created_at >= :startOfMonth', { startOfMonth })
      .getCount();
  }
}
