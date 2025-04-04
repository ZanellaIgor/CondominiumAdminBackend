import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function surveySeed() {
  const condominium = await prisma.condominium.findFirst();
  if (!condominium) throw new Error('Nenhum condomínio encontrado!');

  const survey = await prisma.survey.create({
    data: {
      title: 'Pesquisa de Satisfação do Condomínio',
      description:
        'Queremos saber sua opinião sobre os serviços do condomínio.',
      condominiumId: condominium.id,
      validFrom: new Date(),
      validTo: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      questions: {
        create: [
          {
            text: 'Você está satisfeito com a limpeza das áreas comuns?',
            type: 'BOOLEAN',
            options: {
              create: [{ text: 'Sim' }, { text: 'Não' }],
            },
          },
          {
            text: 'Quais áreas precisam de mais atenção?',
            type: 'MULTIPLE',
            options: {
              create: [
                { text: 'Piscina' },
                { text: 'Academia' },
                { text: 'Salão de festas' },
              ],
            },
          },
        ],
      },
    },
  });

  Logger.log(`Survey "${survey.title}" criado com sucesso!`);
}
