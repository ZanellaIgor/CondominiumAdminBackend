import { Category, Situation } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateMaintenanceDto {
  @IsNotEmpty()
  @IsEnum(Situation)
  situation: Situation;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsEnum(Category)
  category: Category;
}
