import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateApartmentDto {
  @ApiProperty({ description: 'Nome do apartamento', example: 'Apt 101' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'ID do condomínio associado', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  condominiumId: number;

  @ApiProperty({
    description: 'ID do usuário associado (opcional)',
    example: 2,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  userId?: number;
}
