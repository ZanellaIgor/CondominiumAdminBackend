import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { FindAllSurveyDto } from './dto/filter-survey.dto';
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

    const survey = this.prisma.survey.create({
      data: {
        ...surveyData,
        questions: {
          create: transformedQuestions,
        },
      },
    });
    if (!survey) throw new NotFoundException('Survey not found');
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Ordem de manutenção criada com sucesso!',
    };
  }

  async findAllSurveys(query: FindAllSurveyDto) {
    const { condominiumId, limit, page } = query;

    return this.prisma.survey.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        condominiumId,
      },
      include: { SurveyParticipation: { where: { userId: query.userId } } },
    });
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
        throw new NotFoundException('Pesquisa não encontrada!');
      }

      const existingAnswers = await prisma.surveyParticipation.findFirst({
        where: { surveyId: id },
      });

      if (existingAnswers) {
        throw new BadRequestException(
          'A pesquisa já possui respostas e não pode ser alterada!',
        );
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
      if (!updatedSurvey) {
        throw new NotFoundException('Erro ao atualizar a pesquisa');
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Enquete atualizada com sucesso!',
      };
    });
  }

  async deleteSurvey(id: number) {
    return this.prisma.survey.delete({ where: { id } });
  }
}
