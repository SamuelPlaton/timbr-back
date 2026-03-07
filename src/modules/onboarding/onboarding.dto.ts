import {
  IsString,
  IsArray,
  IsObject,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateOnboardingDto {
  @IsString()
  @IsNotEmpty()
  situation: string;

  @IsArray()
  @IsNotEmpty()
  interested_subjects: string[];

  @IsObject()
  @IsNotEmpty()
  company_information: Record<string, any>;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}

export class UpdateOnboardingDto {
  @IsString()
  @IsOptional()
  situation?: string;

  @IsArray()
  @IsOptional()
  interested_subjects?: string[];

  @IsObject()
  @IsOptional()
  company_information?: Record<string, any>;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
