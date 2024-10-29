import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../decorators/role.decorator';
import { RolesGuard } from '../guards/role.guard';
import { ApartamentService } from './apartament.service';
import { CreateApartamentDto } from './dto/create-apartament.dto';
import { FindAllApartamentDto } from './dto/filter-apartament.dto';
import { ApartmentResponseDto } from './dto/response-apartment.dto';
import { PaginatedApartmentsResponseDto } from './dto/response-paginated-apartament.dto';
import { UpdateApartamentDto } from './dto/update-apartament.dto';

@ApiTags('Apartments')
@Controller('apartament')
export class ApartamentController {
  constructor(private readonly apartamentService: ApartamentService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo apartamento' })
  @ApiResponse({ status: 201, description: 'Apartamento criado com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Não foi possível criar o apartamento.',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  create(@Body() createApartamentDto: CreateApartamentDto) {
    return this.apartamentService.create(createApartamentDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  @ApiOperation({ summary: 'Lista todos os apartamentos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de apartamentos retornada com sucesso.',
    type: PaginatedApartmentsResponseDto,
  })
  findAll(@Query() query: FindAllApartamentDto) {
    return this.apartamentService.findAll(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  @ApiOperation({ summary: 'Busca um apartamento por ID' })
  @ApiResponse({
    status: 200,
    description: 'Apartamento encontrado.',
    type: ApartmentResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Apartamento não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.apartamentService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  @ApiOperation({ summary: 'Atualiza um apartamento existente' })
  @ApiResponse({
    status: 200,
    description: 'Apartamento atualizado com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Apartamento não encontrado.' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateApartamentDto) {
    return this.apartamentService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  @ApiOperation({ summary: 'Remove um apartamento por ID' })
  @ApiResponse({
    status: 204,
    description: 'Apartamento removido com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Apartamento não encontrado.' })
  remove(@Param('id') id: string) {
    return this.apartamentService.remove(+id);
  }
}
