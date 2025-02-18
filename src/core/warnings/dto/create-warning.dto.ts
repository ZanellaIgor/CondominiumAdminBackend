import { Category, Situation } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateWarningDto {
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  description?: string;

  @IsOptional()
  @IsEnum(Situation)
  situation: Situation = Situation.ABERTO;

  @IsEnum(Category)
  category: Category;

  @IsInt()
  userId: number;

  @IsInt()
  condominiumId: number;
}
