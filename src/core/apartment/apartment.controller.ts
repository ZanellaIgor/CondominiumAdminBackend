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
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';

import { AuthTokenGuard } from '../auth/guard/auth-token.guard';
import { Roles } from '../common/decorators/role.decorator';

import { RolesGuard } from '../common/guards/role.guard';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { FindAllApartmentDto } from './dto/filter-apartment.dto';
import { ApartmentResponseDto } from './dto/response-apartment.dto';
import { PaginatedApartmentsResponseDto } from './dto/response-paginated-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { InjectContext } from '../common/decorators/context.decorator';
import { ContextGuard } from '../common/guards/context.guard';
import { QueryContextInterceptor } from '../common/interceptor/query-context.interceptor';

@ApiTags('Apartamentos')
@Controller('apartment')
@ApiResponse({ status: 401, description: 'Usuário nao autenticado.' })
export class ApartmentController {
  constructor(private readonly apartmentService: ApartmentService) {}

  @Post()
  @UseGuards(AuthTokenGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  @ApiOperation({ summary: 'Cria um novo apartamento' })
  @ApiResponse({
    status: 201,
    description: 'Apartamento criado com sucesso.',
    type: null,
  })
  @ApiResponse({
    status: 400,
    description: 'Não foi possível criar o apartamento.',
  })
  create(@Body() createApartamentDto: CreateApartmentDto) {
    return this.apartmentService.create(createApartamentDto);
  }

  @Get()
  @UseGuards(AuthTokenGuard)
  @UseInterceptors(QueryContextInterceptor)
  @InjectContext('condominiumIds')
  @UseGuards(AuthTokenGuard, ContextGuard)
  @ApiOperation({ summary: 'Lista todos os apartamentos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de apartamentos retornada com sucesso.',
    type: PaginatedApartmentsResponseDto,
  })
  findAll(@Query() query: FindAllApartmentDto) {
    return this.apartmentService.findAll(query);
  }

  @Get(':id')
  @UseGuards(AuthTokenGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  @ApiOperation({ summary: 'Busca um apartamento por ID' })
  @ApiResponse({
    status: 200,
    description: 'Apartamento encontrado.',
    type: ApartmentResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Apartamento não encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.apartmentService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthTokenGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  @ApiOperation({ summary: 'Atualiza um apartamento existente' })
  @ApiResponse({
    status: 200,
    description: 'Apartamento atualizado com sucesso.',
    type: null,
  })
  @ApiResponse({ status: 404, description: 'Apartamento não encontrado.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateApartmentDto: UpdateApartmentDto,
  ) {
    return this.apartmentService.update(id, updateApartmentDto);
  }

  @Delete(':id')
  @UseGuards(AuthTokenGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  @ApiOperation({ summary: 'Remove um apartamento por ID' })
  @ApiResponse({
    status: 204,
    description: 'Apartamento removido com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Apartamento não encontrado.' })
  remove(@Param('id') id: string) {
    return this.apartmentService.remove(+id);
  }
}
