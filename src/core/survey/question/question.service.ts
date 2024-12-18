import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async createQuestions(surveyId: number, questions: CreateQuestionDto[]) {
    return Promise.all(
      questions.map((question) =>
        this.prisma.question.create({
          data: {
            text: question.text,
            type: question.type,
            surveyId,
            options: {
              create: question.options || [],
            },
          },
          include: { options: true },
        }),
      ),
    );
  }
}
