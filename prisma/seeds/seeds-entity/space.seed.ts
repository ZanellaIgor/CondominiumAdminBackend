import { prismaSeed } from '../prisma-seeds';

export async function spaceSeed() {
  try {
    await prismaSeed.spaceReservation.upsert({
      where: { id: 1 },
      update: {},
      create: { name: 'Sala 1', condominiumId: 1 },
    });
    console.log('Espaço criado com sucesso!');
  } catch (error) {
    console.log('Espaço não criado', error);
  }
}
