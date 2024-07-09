import { prismaSeed } from '../prisma-seeds';

export async function condominiumSeed() {
  const data = {
    name: 'Condominio de teste',
    id: 1,
  };
  try {
    await prismaSeed.condominium.create({
      data,
    });
    console.log('Condominio criado com sucesso!');
  } catch (error) {
    console.log('Condominio não criado', error);
  }
}
