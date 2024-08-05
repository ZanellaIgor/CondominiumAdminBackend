import { prismaSeed } from '../prisma-seeds';

export async function apartmentSeed() {
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
    await prismaSeed.apartment.upsert({
      where: { id: 1 },
      update: {},
      create: data,
    });
    console.log('Apartamento criado ou atualizado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar ou atualizar o apartamento', error);
  }
}
