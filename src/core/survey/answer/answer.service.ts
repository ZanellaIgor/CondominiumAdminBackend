import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/infra/prisma.service';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Injectable()
export class AnswerService {
  constructor(private readonly prisma: PrismaService) {}

  async createAnswer(createAnswerDto: CreateAnswerDto) {
    const { userId, questionId, text, optionId } = createAnswerDto;

    const existingAnswer = await this.prisma.answer.findUnique({
      where: { userId_questionId: { userId, questionId } },
    });

    if (existingAnswer) {
      throw new Error('User has already answered this question.');
    }

    return this.prisma.answer.create({
      data: { userId, questionId, text, optionId },
    });
  }

  async findAnswersByUser(userId: number) {
    return this.prisma.answer.findMany({
      where: { userId },
      include: { question: true },
    });
  }
}
