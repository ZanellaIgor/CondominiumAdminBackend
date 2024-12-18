import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateQuestionDto } from '../../question/dto/create-question.dto';

export class CreateSurveyDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsBoolean()
  status: boolean;

  @IsInt()
  condominiumId: number;

  @IsDate()
  validFrom: Date;

  @IsOptional()
  @IsDate()
  validTo?: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
