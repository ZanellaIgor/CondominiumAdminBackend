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
import { Role } from '@prisma/client';
import { AuthTokenGuard } from 'src/core/auth/guard/auth-token.guard';
import { Roles } from 'src/core/common/decorators/role.decorator';
import { RolesGuard } from 'src/core/common/guards/role.guard';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { FindAllSurveyDto } from './dto/filter-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { SurveyService } from './survey.service';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  @UseGuards(AuthTokenGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  async createSurvey(@Body() createSurveyDto: CreateSurveyDto) {
    return await this.surveyService.createSurvey(createSurveyDto);
  }

  @Get()
  @UseGuards(AuthTokenGuard)
  async findAllSurveys(@Query() query: FindAllSurveyDto) {
    return await this.surveyService.findAllSurveys(query);
  }

  @Get(':id')
  @UseGuards(AuthTokenGuard)
  async findSurveyById(@Param('id') id: string) {
    return await this.surveyService.findSurveyById(+id);
  }

  @Patch(':id')
  @UseGuards(AuthTokenGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  async updateSurvey(
    @Param('id') id: string,
    @Body() updateSurveyDto: UpdateSurveyDto,
  ) {
    return await this.surveyService.updateSurvey(+id, updateSurveyDto);
  }

  @Delete(':id')
  @UseGuards(AuthTokenGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  async deleteSurvey(@Param('id') id: string) {
    return await this.surveyService.deleteSurvey(+id);
  }
}
