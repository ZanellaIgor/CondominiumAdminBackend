import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthTokenGuard } from '../auth/guard/auth-token.guard';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { FindAllReservationDto } from './dto/filter-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationService } from './reservation.service';

@ApiTags('Reservas')
@Controller('reservation')
@ApiResponse({ status: 401, description: 'Usuário não autenticado.' })
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @UseGuards(AuthTokenGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Cria uma nova reserva' })
  @ApiResponse({
    status: 201,
    description: 'Reserva criada com sucesso.',
    type: null,
  })
  @ApiResponse({
    status: 400,
    description: 'Não foi possível criar a reserva.',
  })
  create(@Body() createReserveDto: CreateReservationDto) {
    return this.reservationService.create(createReserveDto);
  }

  @Get()
  @UseGuards(AuthTokenGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Busca reservas paginadas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de reservas retornada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhuma reserva encontrada.',
  })
  findAll(@Query() query: FindAllReservationDto) {
    return this.reservationService.findAll(query);
  }

  @Get(':id')
  @UseGuards(AuthTokenGuard)
  @ApiOperation({ summary: 'Busca uma reserva por ID' })
  @ApiResponse({
    status: 200,
    description: 'Reserva encontrada.',
  })
  @ApiResponse({
    status: 404,
    description: 'Reserva não encontrada.',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reservationService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthTokenGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Atualiza uma reserva existente' })
  @ApiResponse({
    status: 200,
    description: 'Reserva atualizada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Reserva não encontrada.',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationService.update(id, updateReservationDto);
  }

  @Delete(':id')
  @UseGuards(AuthTokenGuard)
  @ApiOperation({ summary: 'Remove uma reserva por ID' })
  @ApiResponse({
    status: 204,
    description: 'Reserva removida com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Reserva não encontrada.',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reservationService.remove(id);
  }
}
