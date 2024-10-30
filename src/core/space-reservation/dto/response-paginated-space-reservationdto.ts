import { ApiProperty } from '@nestjs/swagger';
import { SpaceReservationResponseDto } from './response-space-reservation.dto';

export class PaginatedSpaceReservationResponseDto {
  @ApiProperty({
    description: 'Lista de apartamentos',
    type: [SpaceReservationResponseDto],
  })
  data: SpaceReservationResponseDto[];

  @ApiProperty({ description: 'Número total de apartamentos', example: 100 })
  totalCount: number;

  @ApiProperty({ description: 'Página atual', example: 1 })
  page: number;

  @ApiProperty({ description: 'Limite de itens por página', example: 10 })
  limit: number;
}
