import { Category, Situation } from '@prisma/client';
import { prismaSeed } from '../prisma-seeds';

export async function warningSeed() {
  const data = {
    title: 'Aviso de teste',
    description: 'Descrição do aviso de teste',
    situation: Situation.ABERTO,
    category: Category.MEDIA,
    user: {
      connect: {
        id: 1,
      },
    },
    condominium: {
      connect: {
        id: 1,
      },
    },
  };

  try {
    await prismaSeed.warning.upsert({
      where: { id: 1 },
      update: {},
      create: data,
    });
    console.log('Aviso criado ou atualizado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar ou atualizar o aviso', error);
  }
}
