import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ChatTypeEnum } from '../../entities';

export class CreateChatDto {
  @IsEnum(ChatTypeEnum)
  @IsNotEmpty()
  type: ChatTypeEnum;

  @IsString()
  @IsNotEmpty()
  firstMessage: string;
}

export class SendMessageDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 20;
}
