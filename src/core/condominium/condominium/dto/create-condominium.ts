import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCondominiumDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
