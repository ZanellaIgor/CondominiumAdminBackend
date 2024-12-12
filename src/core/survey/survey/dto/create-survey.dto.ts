import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSurveyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  condominiumId: number;

  @IsNotEmpty()
  questions: {
    text: string;
  }[];
}
