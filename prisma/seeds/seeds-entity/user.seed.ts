import { PrismaClient } from '@prisma/client';

export async function userSeed(prisma: PrismaClient) {
  const data = {
    name: 'Usuário de teste',
    email: 'usuario@teste.com',
    password: 'senha123',
    apartment: {
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
    await prisma.user.upsert({
      where: { email: 'usuario@teste.com' },
      update: {},
      create: data,
    });
    console.log('Usuário criado ou atualizado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar ou atualizar o usuário', error);
  }
}
