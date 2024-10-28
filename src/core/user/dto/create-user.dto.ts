import { Role } from '@prisma/client';
import {
  IsArray,
  IsEmail,
  IsEnum,
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

  @IsArray()
  @IsOptional()
  apartmentIds?: number[];

  @IsArray()
  @IsOptional()
  condominiumIds?: number[];

  @IsEnum(Role)
  role: Role;
}
