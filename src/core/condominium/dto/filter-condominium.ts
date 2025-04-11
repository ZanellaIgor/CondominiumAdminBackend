import { Type } from 'class-transformer';
import { IsArray, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class FindAllCondominiumDto {
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
  name?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  condominiumId?: number;

  @IsArray()
  @IsOptional()
  condominiumIds?: number[];

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  userId?: number;
}
