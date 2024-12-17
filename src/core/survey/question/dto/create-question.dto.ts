import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class CreateQuestionOptionDto {
  @IsString()
  text: string;

  @IsBoolean()
  @IsOptional()
  isBoolean?: boolean;
}

class CreateQuestionDto {
  @IsString()
  text: string;

  @IsString()
  type: 'TEXT' | 'OPTIONAL' | 'MULTIPLE' | 'BOOLEAN';

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionOptionDto)
  @IsOptional()
  options?: CreateQuestionOptionDto[];
}

export class CreateSurveyDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  status: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];

  @IsOptional()
  validFrom?: Date;

  @IsOptional()
  validTo?: Date;

  @IsOptional()
  condominiumId: number;
}
