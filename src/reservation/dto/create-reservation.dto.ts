import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { SituationReservation } from 'src/utils/enum/status-reservation';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  startDateTime: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  endDateTime: Date;

  @IsNotEmpty()
  @IsInt()
  spaceReservationId: number;

  @IsNotEmpty()
  @IsEnum(SituationReservation)
  situation: SituationReservation;

  @IsNotEmpty()
  @IsInt()
  condominiumId: number;
}

export class UpdateReserveDto extends PartialType(CreateReservationDto) {}
