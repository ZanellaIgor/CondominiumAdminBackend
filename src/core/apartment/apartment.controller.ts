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
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { FindAllApartmentDto } from './dto/filter-apartment.dto';
import { ApartmentResponseDto } from './dto/response-apartment.dto';
import { PaginatedApartmentsResponseDto } from './dto/response-paginated-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';

@ApiTags('Apartamentos')
@Controller('apartment')
export class ApartmentController {
  constructor(private readonly apartmentService: ApartmentService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  @ApiOperation({ summary: 'Cria um novo apartamento' })
  @ApiResponse({ status: 201, description: 'Apartamento criado com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Não foi possível criar o apartamento.',
  })
  create(@Body() createApartamentDto: CreateApartmentDto) {
    return this.apartmentService.create(createApartamentDto);
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
  findAll(@Query() query: FindAllApartmentDto) {
    return this.apartmentService.findAll(query);
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
    return this.apartmentService.findOne(+id);
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
  update(@Param('id') id: string, @Body() updateUserDto: UpdateApartmentDto) {
    return this.apartmentService.update(+id, updateUserDto);
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
    return this.apartmentService.remove(+id);
  }
}
