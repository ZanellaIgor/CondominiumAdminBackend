import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';

@Injectable()
export class SurveyService {
  constructor(private readonly prisma: PrismaService) {}

  async createSurvey(createSurveyDto: CreateSurveyDto) {
    const { questions, ...surveyData } = createSurveyDto;

    const transformedQuestions = questions.map((question) => ({
      text: question.text,
      type: question.type,
      options: question.options
        ? { create: question.options.map((option) => ({ text: option.text })) }
        : undefined,
    }));

    return this.prisma.survey.create({
      data: {
        ...surveyData,
        questions: {
          create: transformedQuestions,
        },
      },
    });
  }

  async findAllSurveys() {
    return this.prisma.survey.findMany();
  }

  async findSurveyById(id: number) {
    const survey = await this.prisma.survey.findUnique({
      where: { id },
      include: { questions: { include: { options: true } } },
    });
    if (!survey) throw new NotFoundException('Survey not found');
    return survey;
  }

  async updateSurvey(id: number, updateSurveyDto: UpdateSurveyDto) {
    const { questions, ...surveyData } = updateSurveyDto;

    // Atualiza o survey
    const updatedSurvey = await this.prisma.survey.update({
      where: { id },
      data: {
        ...surveyData,
        questions: {
          // Atualiza ou cria as questions
          upsert: questions.map((question) => ({
            where: { id: question.id || -1 }, // Usa um ID inválido se não existir
            update: {
              text: question.text,
              type: question.type,
              // Atualiza ou cria as options
              options: {
                upsert:
                  question.options?.map((option) => ({
                    where: { id: option.id || -1 }, // Usa um ID inválido se não existir
                    update: { text: option.text },
                    create: { text: option.text },
                  })) || [],
              },
            },
            create: {
              text: question.text,
              type: question.type,
              // Cria as options se necessário
              options: {
                create:
                  question.options?.map((option) => ({
                    text: option.text,
                  })) || [],
              },
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    return updatedSurvey;
  }

  async deleteSurvey(id: number) {
    return this.prisma.survey.delete({ where: { id } });
  }
}
