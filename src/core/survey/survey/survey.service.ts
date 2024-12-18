import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/infra/prisma.service';
import { QuestionService } from '../question/question.service';
import { CreateSurveyDto } from './dto/create-survey.dto';

@Injectable()
export class SurveyService {
  constructor(
    private prisma: PrismaService,
    private questionService: QuestionService,
  ) {}

  async createSurvey(data: CreateSurveyDto) {
    const { questions, ...surveyData } = data;

    const survey = await this.prisma.survey.create({ data: surveyData });

    if (questions) {
      await this.questionService.createQuestions(survey.id, questions);
    }

    return this.getSurveyById(survey.id);
  }

  async getSurveyById(id: number) {
    return this.prisma.survey.findUnique({
      where: { id },
      include: { questions: { include: { options: true } } },
    });
  }

  async getAllSurveys() {
    return this.prisma.survey.findMany({
      include: { questions: { include: { options: true } } },
    });
  }
}
