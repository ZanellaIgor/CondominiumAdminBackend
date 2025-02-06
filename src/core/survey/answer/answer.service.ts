import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/infra/prisma.service';
import { CreateAnswersDto } from './dto/create-answer.dto';

@Injectable()
export class AnswerService {
  constructor(private readonly prisma: PrismaService) {}

  async createAnswers(userId: number, createAnswersDto: CreateAnswersDto) {
    const { surveyId, answers } = createAnswersDto;

    // Verifica se o usuário já respondeu a algumas perguntas do questionário
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

    // Preparando os dados para inserção em batch
    const answerData = answers.map(({ questionId, text, optionId }) => ({
      userId,
      questionId,
      text,
      optionId,
    }));

    return this.prisma.answer.createMany({
      data: answerData,
      skipDuplicates: true,
    });
  }

  async findAnswersByUser(userId: number) {
    return this.prisma.answer.findMany({
      where: { userId },
      include: { question: true },
    });
  }
}
