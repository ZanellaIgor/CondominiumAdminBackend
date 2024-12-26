import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { SurveyService } from './survey.service';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  async createSurvey(@Body() createSurveyDto: CreateSurveyDto) {
    return await this.surveyService.createSurvey(createSurveyDto);
  }

  @Get()
  async findAllSurveys() {
    return await this.surveyService.findAllSurveys();
  }

  @Get(':id')
  async findSurveyById(@Param('id') id: string) {
    return await this.surveyService.findSurveyById(+id);
  }

  @Put(':id')
  async updateSurvey(
    @Param('id') id: string,
    @Body() updateSurveyDto: UpdateSurveyDto,
  ) {
    return await this.surveyService.updateSurvey(+id, updateSurveyDto);
  }

  @Delete(':id')
  async deleteSurvey(@Param('id') id: string) {
    return await this.surveyService.deleteSurvey(+id);
  }
}
