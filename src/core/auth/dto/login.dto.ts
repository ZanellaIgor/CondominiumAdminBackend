import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  data: string;

  @IsString()
  iv: string;

  @IsString()
  key: string;

  @IsString()
  authTag: string;
}
