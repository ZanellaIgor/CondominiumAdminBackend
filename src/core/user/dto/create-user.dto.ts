import { Role } from '@prisma/client';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @IsNotEmpty()
  @IsArray()
  condominiumIds: number[];

  @IsEnum(Role)
  role: Role;
}
