import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/infra/prisma.service';
import { CreateAnswersDto } from './dto/create-answer.dto';

@Injectable()
export class AnswerService {
  constructor(private readonly prisma: PrismaService) {}

  async createAnswers(userId: number, createAnswersDto: CreateAnswersDto) {
    const { surveyId, answers } = createAnswersDto;

    const questionIds = answers.map((a) => a.questionId);
    const existingAnswers = await this.prisma.answer.findMany({
      where: {
        userId: userId,
        questionId: { in: questionIds },
      },
    });

    if (existingAnswers.length > 0) {
      throw new BadRequestException(
        'Usuário já respondeu algumas perguntas deste questionário.',
      );
    }

    const answerData = answers.map(({ questionId, text, optionId }) => ({
      userId,
      questionId,
      text,
      optionId,
      surveyId,
    }));

    await this.prisma.answer.createMany({
      data: answerData,
      skipDuplicates: true,
    });

    await this.prisma.surveyParticipation.upsert({
      where: {
        surveyId_userId: {
          surveyId,
          userId,
        },
      },
      update: {
        hasResponded: true,
      },
      create: {
        surveyId,
        userId,
        hasResponded: true,
      },
    });
  }

  async findAnswersByUser(userId: number) {
    return this.prisma.answer.findMany({
      where: { userId },
      include: { question: true },
    });
  }
}
