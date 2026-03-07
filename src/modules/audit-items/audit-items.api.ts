import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditItem } from '../../entities';
import { QueryBuilder } from '../utils';

@Injectable()
export class AuditItemsApi {
  constructor(
    @InjectRepository(AuditItem)
    private readonly repository: Repository<AuditItem>,
  ) {}

  public async findOne(filters: object = {}): Promise<AuditItem | null> {
    return new QueryBuilder<AuditItem>(this.repository, 'audit_item')
      .withRelations(['audit', 'audit.user'])
      .withFilters(filters)
      .findOne();
  }

  public async findOneOrFail(filters: object = {}): Promise<AuditItem> {
    return new QueryBuilder<AuditItem>(this.repository, 'audit_item')
      .withRelations(['audit', 'audit.user'])
      .withFilters(filters)
      .findOneOrFail();
  }

  public async update(
    auditItem: AuditItem,
    params: Partial<AuditItem>,
  ): Promise<AuditItem> {
    Object.assign(auditItem, params);
    return await this.repository.save(auditItem);
  }
}
