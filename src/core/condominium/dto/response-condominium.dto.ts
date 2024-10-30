import { ApiProperty } from '@nestjs/swagger';

export class CondominiumResponseDto {
  @ApiProperty({ description: 'ID do condominío', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Nome do condominío',
    example: 'Condominío Lua Nova',
  })
  name: string;
}
