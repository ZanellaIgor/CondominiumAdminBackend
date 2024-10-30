import { ApiProperty } from '@nestjs/swagger';
import { CondominiumResponseDto } from './response-condominium.dto';

export class PaginatedCondominiumResponseDto {
  @ApiProperty({
    description: 'Lista de condominíos',
    type: [CondominiumResponseDto],
  })
  data: CondominiumResponseDto[];

  @ApiProperty({ description: 'Número total de condominíos', example: 100 })
  totalCount: number;

  @ApiProperty({ description: 'Página atual', example: 1 })
  page: number;

  @ApiProperty({ description: 'Limite de itens por página', example: 10 })
  limit: number;
}
