import { PartialType } from '@nestjs/mapped-types';
import { SituationReservation } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { CreateReservationDto } from './create-reservation.dto';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {
  @IsNotEmpty()
  @IsEnum(SituationReservation)
  situation: SituationReservation;
}
