import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateQuestionDto } from './create-question.dto';

export class CreateSurveyDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  status: boolean;

  @Type(() => Date)
  @IsDate()
  validFrom: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  validTo?: Date;

  @IsInt()
  condominiumId: number;

  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
