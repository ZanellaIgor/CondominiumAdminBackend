import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prismaSeed = new PrismaClient();

export async function answerSeed() {
  const user = await prismaSeed.user.findFirst();
  const survey = await prismaSeed.survey.findFirst({
    include: { questions: { include: { options: true } } },
  });

  if (!user || !survey) throw new Error('Usuário ou Survey não encontrado!');

  for (const question of survey.questions) {
    const baseAnswerData = {
      userId: user.id,
      questionId: question.id,
      surveyId: survey.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    let answerData;

    if (question.type === 'BOOLEAN') {
      const option = await prismaSeed.questionOption.findFirst({
        where: { questionId: question.id, text: 'Sim' },
      });
      answerData = {
        ...baseAnswerData,
        optionId: option?.id ?? null,
      };
    } else if (question.type === 'MULTIPLE') {
      const option = await prismaSeed.questionOption.findFirst({
        where: { questionId: question.id },
      });
      answerData = {
        ...baseAnswerData,
        optionId: option?.id ?? null,
      };
    } else if (question.type === 'TEXT') {
      answerData = {
        ...baseAnswerData,
        text: 'Ótimo condomínio!',
      };
    } else {
      answerData = baseAnswerData;
    }

    await prismaSeed.answer.create({ data: answerData });
  }

  Logger.log('Answers criadas com sucesso!');
}
