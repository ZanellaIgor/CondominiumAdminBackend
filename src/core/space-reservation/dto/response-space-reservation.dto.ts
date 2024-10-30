import { ApiProperty } from '@nestjs/swagger';

export class CondominiumDto {
  @ApiProperty({ description: 'ID do condomínio', example: 1 })
  id: number;

  @ApiProperty({ description: 'Nome do condomínio', example: 'Condomínio Lua' })
  name: string;
}

export class SpaceReservationResponseDto {
  @ApiProperty({ description: 'ID do espaço reservado', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Nome do espaço',
    example: 'Churrasqueira Bloco 2',
  })
  name: string;

  @ApiProperty({
    description: 'Condomínio associado',
    type: () => CondominiumDto,
  })
  condominium: CondominiumDto;
}
