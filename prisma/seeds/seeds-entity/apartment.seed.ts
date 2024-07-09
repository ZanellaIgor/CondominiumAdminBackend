import { PrismaClient } from '@prisma/client';

export async function apartmentSeed(prisma: PrismaClient) {
  const data = {
    name: 'Apartamento de teste',
    condominium: {
      connectOrCreate: {
        where: {
          id: 1,
        },
        create: {
          name: 'Condomínio de teste',
        },
      },
    },
  };

  try {
    await prisma.apartment.upsert({
      where: { id: 1 },
      update: {},
      create: data,
    });
    console.log('Apartamento criado ou atualizado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar ou atualizar o apartamento', error);
  }
}
