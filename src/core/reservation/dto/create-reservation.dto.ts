import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @IsOptional()
  @IsInt()
  apartmentId: number;

  @IsNotEmpty()
  @IsInt()
  condominiumId: number;
}
