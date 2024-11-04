import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Situation } from 'src/utils/enum/status.enum';

export class FindAllUserDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  condominiumIds?: number[];

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(Situation)
  status?: Situation;
}
