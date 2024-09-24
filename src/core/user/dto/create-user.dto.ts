import { Role } from '@prisma/client';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
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

  @IsNotEmpty()
  @IsArray()
  condominiumIds: number[];

  @IsEnum(Role)
  role: Role;
}
