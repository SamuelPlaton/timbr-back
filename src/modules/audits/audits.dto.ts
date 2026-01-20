import { IsUUID } from 'class-validator';

export class GetAuditByIdDto {
  @IsUUID()
  id: string;
}
