import { QuestionType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class UptateQuestionOptionDto {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsString()
  text: string;
}

export class UptateQuestionDto {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsString()
  text: string;

  @IsEnum(QuestionType)
  type: QuestionType;

  @ValidateNested({ each: true })
  @Type(() => UptateQuestionOptionDto)
  @IsOptional()
  options?: UptateQuestionOptionDto[];
}
