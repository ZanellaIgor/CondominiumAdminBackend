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

    return this.prisma.$transaction(async (prisma) => {
      const existingSurvey = await prisma.survey.findUnique({
        where: { id },
        include: { questions: { include: { options: true } } },
      });

      if (!existingSurvey) {
        throw new Error('Pesquisa não encontrada');
      }

      const existingQuestionIds = existingSurvey.questions.map((q) => q.id);
      const existingOptionIds = existingSurvey.questions.flatMap((q) =>
        q.options.map((o) => o.id),
      );

      const incomingQuestionIds = questions
        .map((q) => q.id)
        .filter((id) => id !== undefined);
      const incomingOptionIds = questions.flatMap(
        (q) =>
          q.options?.map((o) => o.id).filter((id) => id !== undefined) || [],
      );

      const questionsToDelete = existingQuestionIds.filter(
        (id) => !incomingQuestionIds.includes(id),
      );
      const optionsToDelete = existingOptionIds.filter(
        (id) => !incomingOptionIds.includes(id),
      );

      await prisma.question.deleteMany({
        where: { id: { in: questionsToDelete } },
      });
      await prisma.questionOption.deleteMany({
        where: { id: { in: optionsToDelete } },
      });

      const updatedSurvey = await prisma.survey.update({
        where: { id },
        data: {
          ...surveyData,
          questions: {
            upsert: questions.map((question) => ({
              where: { id: question.id || -1 },
              update: {
                text: question.text,
                type: question.type,

                options:
                  question.type === 'TEXT'
                    ? undefined
                    : {
                        upsert:
                          question.options?.map((option) => ({
                            where: { id: option.id || -1 },
                            update: { text: option.text },
                            create: { text: option.text },
                          })) || [],
                      },
              },
              create: {
                text: question.text,
                type: question.type,

                options:
                  question.type === 'TEXT'
                    ? undefined
                    : {
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
    });
  }

  async deleteSurvey(id: number) {
    return this.prisma.survey.delete({ where: { id } });
  }
}
