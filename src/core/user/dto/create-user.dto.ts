import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  profilePhoto?: string;

  @IsNumber()
  apartmentId: number;

  @IsNumber()
  condominiumId: number;
}
