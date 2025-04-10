import { Role } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
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

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @IsEnum(Role)
  role: Role;
}
