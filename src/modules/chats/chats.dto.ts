import { IsString, IsNotEmpty, IsEnum, IsArray, IsOptional } from 'class-validator';
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
