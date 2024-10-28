import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateApartamentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  condominiumId: number;

  @IsNumber()
  @IsOptional()
  userId?: number;
}
