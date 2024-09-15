import { prismaSeed } from '../prisma-seeds';

export async function apartmentSeed() {
  try {
    await prismaSeed.apartment.create({
      data: {
        name: 'Apto 101',
        condominiumId: 1,
      },
    });

    await prismaSeed.apartment.create({
      data: {
        name: 'Apto 202',
        condominiumId: 2,
      },
    });
    console.log('Apartamento criado ou atualizado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar ou atualizar o apartamento', error);
  }
}
