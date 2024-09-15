import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { SituationReservation } from 'src/utils/enum/status-reservation';

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
  @IsEnum(SituationReservation)
  situation?: SituationReservation;

  @IsOptional()
  @IsInt()
  condominiumId?: number;

  @IsOptional()
  @IsInt()
  userId?: number;
}
