import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateApartamentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  condominiumId: number;

  @IsNumber()
  userId?: number;
}
