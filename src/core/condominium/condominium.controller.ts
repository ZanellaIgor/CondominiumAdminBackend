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
import { CondominiumService } from './condominium.service';
import { CreateCondominiumDto } from './dto/create-condominium';
import { FindAllCondominiumDto } from './dto/filter-condominium';
import { CondominiumResponseDto } from './dto/response-condominium.dto';
import { PaginatedCondominiumResponseDto } from './dto/response-paginated-condominium.dto';
import { UpdateCondominiumDto } from './dto/update-condominium';
import { InjectContext } from '../common/decorators/context.decorator';
import { QueryContextInterceptor } from '../common/interceptor/query-context.interceptor';
import { ContextGuard } from '../common/guards/context.guard';

@ApiTags('Condominíos')
@Controller('condominium')
@ApiResponse({ status: 401, description: 'Usuário nao autenticado.' })
export class CondominiumController {
  constructor(private readonly condominiumService: CondominiumService) {}

  @Post()
  @UseGuards(AuthTokenGuard, RolesGuard)
  @Roles(Role.MASTER)
  @ApiOperation({ summary: 'Cria um novo condomínio' })
  @ApiResponse({ status: 201, description: 'Condomínio criado com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Não foi possível criar o condomínio.',
  })
  create(@Body() createCondominiumDto: CreateCondominiumDto) {
    return this.condominiumService.create(createCondominiumDto);
  }

  @Get()
  @UseInterceptors(QueryContextInterceptor)
  @InjectContext('condominiumIds')
  @UseGuards(AuthTokenGuard, ContextGuard)
  @ApiOperation({ summary: 'Lista todos os condomínios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de condomínios retornada com sucesso.',
    type: PaginatedCondominiumResponseDto,
  })
  findAll(@Query() query: FindAllCondominiumDto) {
    return this.condominiumService.findAll(query);
  }

  @Get(':id')
  @UseGuards(AuthTokenGuard)
  @ApiOperation({ summary: 'Busca um condominío por ID' })
  @ApiResponse({
    status: 200,
    description: 'Condominío encontrado.',
    type: CondominiumResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Condominío não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.condominiumService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthTokenGuard)
  @UseGuards(AuthTokenGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  update(
    @Param('id') id: string,
    @Body() updateCondominiumDto: UpdateCondominiumDto,
  ) {
    return this.condominiumService.update(+id, updateCondominiumDto);
  }
}
