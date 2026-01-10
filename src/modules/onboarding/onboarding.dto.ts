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
  company_information: {
    siren?: string;
    siret?: string;
    company_name?: string;
    legal_form?: string;
    address?: string;
    creation_date?: string;
    [key: string]: any;
  };

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
  company_information?: {
    siren?: string;
    siret?: string;
    company_name?: string;
    legal_form?: string;
    address?: string;
    creation_date?: string;
    [key: string]: any;
  };

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
