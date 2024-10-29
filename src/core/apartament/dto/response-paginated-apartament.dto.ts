import { ApiProperty } from '@nestjs/swagger';
import { ApartmentResponseDto } from './response-apartment.dto';

export class PaginatedApartmentsResponseDto {
  @ApiProperty({
    description: 'Lista de apartamentos',
    type: [ApartmentResponseDto],
  })
  data: ApartmentResponseDto[];

  @ApiProperty({ description: 'Número total de apartamentos', example: 100 })
  totalCount: number;

  @ApiProperty({ description: 'Página atual', example: 1 })
  page: number;

  @ApiProperty({ description: 'Limite de itens por página', example: 10 })
  limit: number;
}
