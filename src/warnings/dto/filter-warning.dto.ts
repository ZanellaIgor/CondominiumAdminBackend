import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Category } from 'src/utils/enum/category.enum';
import { Situation } from 'src/utils/enum/status.enum';

export class FindAllWarningsDto {
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
  title?: string;

  @IsOptional()
  @IsEnum(Situation)
  status?: Situation;

  @IsOptional()
  @IsEnum(Category)
  category?: Category;
}
