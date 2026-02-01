import { IsNotEmpty, IsString } from 'class-validator';

export class SendContactDto {
  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
