import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAnswerDto {
  @IsInt()
  userId: number;

  @IsInt()
  questionId: number;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsInt()
  optionId?: number;
}
