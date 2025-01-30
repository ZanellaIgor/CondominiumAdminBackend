import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UptateQuestionDto } from './update-question.dto';

export class UpdateSurveyDto {
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
  @Type(() => UptateQuestionDto)
  questions: UptateQuestionDto[];
}
