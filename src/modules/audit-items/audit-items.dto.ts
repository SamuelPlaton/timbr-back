import { IsEnum, IsOptional } from 'class-validator';
import { AuditItemStatus } from '../../entities';

export class UpdateAuditItemDto {
  @IsEnum(AuditItemStatus)
  @IsOptional()
  status?: AuditItemStatus;
}
