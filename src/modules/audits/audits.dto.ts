import { IsUUID, IsOptional, IsObject } from 'class-validator';

export class GetAuditByIdDto {
  @IsUUID()
  id: string;
}

export class GenerateAuditDto {
  @IsOptional()
  @IsObject()
  company_information?: Record<string, any>;
}
