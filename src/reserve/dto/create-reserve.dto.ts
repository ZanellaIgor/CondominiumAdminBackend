import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { SituationReservation } from 'src/utils/enum/status-reservation';

export class CreateReserveDto {
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
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @IsString()
  endTime: string;

  @IsNotEmpty()
  @IsDateString()
  @Type(() => Date)
  dateReservation: Date;

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

export class UpdateReserveDto extends PartialType(CreateReserveDto) {}
