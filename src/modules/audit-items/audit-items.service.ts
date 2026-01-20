import { Injectable } from '@nestjs/common';
import { AuditItemsApi } from './audit-items.api';
import { AuditItem } from '../../entities';

@Injectable()
export class AuditItemsService {
  constructor(private auditItemsApi: AuditItemsApi) {}

  async findOne(filters: object = {}): Promise<AuditItem | null> {
    return this.auditItemsApi.findOne(filters);
  }

  async findOneOrFail(filters: object = {}): Promise<AuditItem> {
    return this.auditItemsApi.findOneOrFail(filters);
  }

  async update(
    auditItem: AuditItem,
    params: Partial<AuditItem>,
  ): Promise<AuditItem> {
    return this.auditItemsApi.update(auditItem, params);
  }
}
