import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

class AnswerDto {
  @IsInt()
  questionId: number;

  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.answer !== undefined && typeof o.answer === 'string')
  text?: string;

  @IsOptional()
  @IsInt()
  @ValidateIf((o) => o.answer !== undefined && typeof o.answer === 'number')
  optionId?: number;
}

export class CreateAnswersDto {
  @IsInt()
  surveyId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}
