import { Situation } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class FindAllMaintenanceDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(Situation)
  situation: Situation;

  @IsArray()
  @IsOptional()
  condominiumIds?: number[];

  @IsOptional()
  @IsInt()
  userId?: number;
}
