import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditItem } from '../../entities';
import { AuditItemsApi } from './audit-items.api';
import { AuditItemsService } from './audit-items.service';
import { AuditItemsController } from './audit-items.controller';
import { UsersModule } from '../users';

@Module({
  imports: [TypeOrmModule.forFeature([AuditItem]), UsersModule],
  providers: [AuditItemsApi, AuditItemsService],
  controllers: [AuditItemsController],
  exports: [AuditItemsApi, AuditItemsService],
})
export class AuditItemsModule {}
