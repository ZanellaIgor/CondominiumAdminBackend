import { SituationReservation } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateReservationDto {
  @IsOptional()
  @IsEnum(SituationReservation)
  situation: SituationReservation;

  @IsOptional()
  @IsString()
  description: SituationReservation;
}
