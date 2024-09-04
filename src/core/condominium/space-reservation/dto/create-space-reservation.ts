import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateSpaceReservationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  condominiumId: number;
}
