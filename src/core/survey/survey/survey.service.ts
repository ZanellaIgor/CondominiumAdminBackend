import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/infra/prisma.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';

@Injectable()
export class SurveyService {
  constructor(private readonly prisma: PrismaService) {}

  async createSurvey(createSurveyDto: CreateSurveyDto) {
    const { questions, ...surveyData } = createSurveyDto;
    return this.prisma.survey.create({
      data: {
        ...surveyData,
        questions: {
          create: questions,
        },
      },
    });
  }

  async findAllSurveys() {
    return this.prisma.survey.findMany({
      include: { questions: true },
    });
  }

  async findSurveyById(id: number) {
    const survey = await this.prisma.survey.findUnique({
      where: { id },
      include: { questions: true },
    });
    if (!survey) throw new NotFoundException('Survey not found');
    return survey;
  }

  async updateSurvey(id: number, updateSurveyDto: UpdateSurveyDto) {
    const { questions, ...surveyData } = updateSurveyDto;
    return this.prisma.survey.update({
      where: { id },
      data: {
        ...surveyData,
        questions: {
          deleteMany: {},
          create: questions,
        },
      },
    });
  }

  async deleteSurvey(id: number) {
    return this.prisma.survey.delete({ where: { id } });
  }
}
