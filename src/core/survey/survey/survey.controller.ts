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
import { AuthTokenGuard } from 'src/core/auth/guard/auth-token.guard';
import { InjectContext } from 'src/core/common/decorators/context.decorator';
import { Roles } from 'src/core/common/decorators/role.decorator';
import { RolesGuard } from 'src/core/common/guards/role.guard';
import { QueryContextInterceptor } from 'src/core/common/interceptor/query-context.interceptor';
import { IResponse } from 'src/utils/interfaces/response.interface';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { FindAllSurveyDto } from './dto/filter-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { SurveyService } from './survey.service';

@ApiTags('Enquetes')
@Controller('survey')
@ApiResponse({ status: 401, description: 'Usuário não autenticado.' })
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  @UseGuards(AuthTokenGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  @ApiOperation({ summary: 'Cria uma nova enquete' })
  @ApiResponse({
    status: 201,
    description: 'Enquete criada com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Não foi possível criar a enquete.',
  })
  async createSurvey(
    @Body() createSurveyDto: CreateSurveyDto,
  ): Promise<IResponse> {
    return await this.surveyService.createSurvey(createSurveyDto);
  }

  @Get()
  @UseInterceptors(QueryContextInterceptor)
  @InjectContext('userId')
  @UseGuards(AuthTokenGuard)
  @ApiOperation({ summary: 'Busca enquetes paginadas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de enquetes retornada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhuma enquete encontrada.',
  })
  async findAllSurveys(@Query() query: FindAllSurveyDto) {
    return await this.surveyService.findAllSurveys(query);
  }

  @Get(':id')
  @UseGuards(AuthTokenGuard)
  @ApiOperation({ summary: 'Busca uma enquete por ID' })
  @ApiResponse({
    status: 200,
    description: 'Enquete encontrada.',
  })
  @ApiResponse({
    status: 404,
    description: 'Enquete não encontrada.',
  })
  async findSurveyById(@Param('id', ParseIntPipe) id: number) {
    return await this.surveyService.findSurveyById(id);
  }

  @Patch(':id')
  @UseGuards(AuthTokenGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  @ApiOperation({ summary: 'Atualiza uma enquete existente' })
  @ApiResponse({
    status: 200,
    description: 'Enquete atualizada com sucesso.',
    type: null,
  })
  @ApiResponse({
    status: 404,
    description: 'Enquete não encontrada.',
  })
  async updateSurvey(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSurveyDto: UpdateSurveyDto,
  ): Promise<IResponse> {
    return await this.surveyService.updateSurvey(id, updateSurveyDto);
  }

  @Delete(':id')
  @UseGuards(AuthTokenGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  @ApiOperation({ summary: 'Remove uma enquete por ID' })
  @ApiResponse({
    status: 204,
    description: 'Enquete removida com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Enquete não encontrada.',
  })
  async deleteSurvey(@Param('id', ParseIntPipe) id: number) {
    return await this.surveyService.deleteSurvey(id);
  }
}
