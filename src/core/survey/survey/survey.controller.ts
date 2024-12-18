import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { SurveyService } from './survey.service';

@Controller('surveys')
export class SurveyController {
  constructor(private surveyService: SurveyService) {}

  @Post()
  async create(@Body() createSurveyDto: CreateSurveyDto) {
    return this.surveyService.createSurvey(createSurveyDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.surveyService.getSurveyById(Number(id));
  }

  @Get()
  async findAll() {
    return this.surveyService.getAllSurveys();
  }
}
