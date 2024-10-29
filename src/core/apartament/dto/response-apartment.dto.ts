import { ApiProperty } from '@nestjs/swagger';

export class CondominiumDto {
  @ApiProperty({ description: 'ID do condomínio', example: 1 })
  id: number;

  @ApiProperty({ description: 'Nome do condomínio', example: 'Condomínio A' })
  name: string;
}

export class ApartmentResponseDto {
  @ApiProperty({ description: 'ID do apartamento', example: 1 })
  id: number;

  @ApiProperty({ description: 'Nome do apartamento', example: 'Apt 101' })
  name: string;

  @ApiProperty({
    description: 'Condomínio associado',
    type: () => CondominiumDto,
  })
  condominium: CondominiumDto;
}
