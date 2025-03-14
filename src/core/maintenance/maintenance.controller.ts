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
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthTokenGuard } from '../auth/guard/auth-token.guard';
import { InjectContext } from '../common/decorators/context.decorator';
import { ContextGuard } from '../common/guards/context.guard';

import { BodyContextInterceptor } from '../common/interceptor/body-context.interceptor';
import { QueryContextInterceptor } from '../common/interceptor/query-context.interceptor';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { FindAllMaintenanceDto } from './dto/filter-reservation.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';

import { MaintenanceService } from './maintenance.service';

@ApiTags('Manutenções')
@Controller('maintenance')
@ApiResponse({ status: 401, description: 'Usuário não autenticado.' })
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Post()
  @UseInterceptors(BodyContextInterceptor)
  @InjectContext('userId', 'condominiumId')
  @UseGuards(AuthTokenGuard, ContextGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Cria uma ordem de manutenção' })
  @ApiResponse({
    status: 201,
    description: 'Ordem de manutenção criada com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Não foi possível criar a ordem de manutenção.',
  })
  create(@Body() createMaintenanceDto: CreateMaintenanceDto) {
    return this.maintenanceService.create(createMaintenanceDto);
  }

  @Get()
  @UseInterceptors(QueryContextInterceptor)
  @InjectContext('condominiumIds')
  @UseGuards(AuthTokenGuard, ContextGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Busca ordens de manutenção paginadas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de ordens de manutenção retornada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhuma ordem de manutenção encontrada.',
  })
  findAll(@Query() query: FindAllMaintenanceDto) {
    return this.maintenanceService.findAll(query);
  }

  @Get(':id')
  @UseGuards(AuthTokenGuard, ContextGuard)
  @ApiOperation({ summary: 'Busca uma ordem de manutenção por ID' })
  @ApiResponse({
    status: 200,
    description: 'Ordem de manutenção encontrada.',
  })
  @ApiResponse({
    status: 404,
    description: 'Ordem de manutenção não encontrada.',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.maintenanceService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthTokenGuard, ContextGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Atualiza uma ordem de manutenção existente' })
  @ApiResponse({
    status: 200,
    description: 'Ordem de manutenção atualizada com sucesso.',
    type: null,
  })
  @ApiResponse({
    status: 404,
    description: 'Ordem de manutenção não encontrada.',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMaintenanceDto: UpdateMaintenanceDto,
  ) {
    return this.maintenanceService.update(id, updateMaintenanceDto);
  }

  @Delete(':id')
  @UseGuards(AuthTokenGuard)
  @ApiOperation({ summary: 'Remove uma ordem de manutenção por ID' })
  @ApiResponse({
    status: 204,
    description: 'Ordem de manutenção removida com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Ordem de manutenção não encontrada.',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.maintenanceService.remove(id);
  }
}
