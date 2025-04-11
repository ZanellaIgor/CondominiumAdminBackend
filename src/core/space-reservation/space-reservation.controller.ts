import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { AuthTokenGuard } from '../auth/guard/auth-token.guard';
import { Roles } from '../common/decorators/role.decorator';

import { RolesGuard } from '../common/guards/role.guard';
import { CreateSpaceReservationDto } from './dto/create-space-reservation';
import { FindAllSpaceReservationDto } from './dto/filter-space-reservation';
import { PaginatedSpaceReservationResponseDto } from './dto/response-paginated-space-reservationdto';
import { UpdateSpaceReservationDto } from './dto/update-space-reservation';
import { SpaceReservationService } from './space-reservation.service';
import { ContextGuard } from '../common/guards/context.guard';
import { QueryContextInterceptor } from '../common/interceptor/query-context.interceptor';
import { InjectContext } from '../common/decorators/context.decorator';

@ApiTags('Espaços comum para reserva')
@Controller('space-reservation')
export class SpaceReservationController {
  constructor(
    private readonly spaceReservationService: SpaceReservationService,
  ) {}

  @Post()
  @UseGuards(AuthTokenGuard, RolesGuard, ContextGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  @ApiOperation({ summary: 'Cria um espaço comum no condominío para reserva' })
  @ApiResponse({ status: 201, description: 'Apartamento criado com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Não foi possível criar o espaço para reserva.',
  })
  create(@Body() createReserveDto: CreateSpaceReservationDto) {
    return this.spaceReservationService.create(createReserveDto);
  }

  @Get()
  @UseInterceptors(QueryContextInterceptor)
  @InjectContext('condominiumIds', 'condominiumId')
  @UseGuards(AuthTokenGuard, ContextGuard)
  @ApiOperation({ summary: 'Lista todos os locais para reserva' })
  @ApiResponse({
    status: 200,
    description: 'Lista de espaços para reserva retornada com sucesso.',
    type: PaginatedSpaceReservationResponseDto,
  })
  findAll(@Query() query: FindAllSpaceReservationDto) {
    return this.spaceReservationService.findAll(query);
  }

  @Get(':id')
  @UseInterceptors(QueryContextInterceptor)
  @InjectContext('condominiumIds')
  @UseGuards(AuthTokenGuard, RolesGuard, ContextGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  findOne(@Param('id') id: string) {
    return this.spaceReservationService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthTokenGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateSpaceReservationDto,
  ) {
    return this.spaceReservationService.update(+id, updateReservationDto);
  }
}
