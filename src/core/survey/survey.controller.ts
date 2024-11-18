import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { SurveyService } from './survey.service';

@ApiTags('Enquetes')
@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma enquete para um condomínio' })
  @ApiResponse({ status: 201, description: 'Enquete criado com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Não foi possível criar a enquete.',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createSurveyDto: CreateSurveyDto) {
    return this.surveyService.create(createSurveyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as enquetes' })
  findAll() {
    return this.surveyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma enquete por ID' })
  findOne(@Param('id') id: number) {
    return this.surveyService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id') id: number, @Body() updateSurveyDto: UpdateSurveyDto) {
    return this.surveyService.update(+id, updateSurveyDto);
  }
}
