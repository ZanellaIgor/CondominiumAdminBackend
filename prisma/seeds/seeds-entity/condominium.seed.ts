import { prismaSeed } from '../prisma-seeds';

export async function condominiumSeed() {
  try {
    await prismaSeed.condominium.create({
      data: {
        name: 'Condomínio Sol',
      },
    });

    await prismaSeed.condominium.create({
      data: {
        name: 'Condomínio Lua',
      },
    });
    console.log('Condominio criado com sucesso!');
  } catch (error) {
    console.log('Condominio não criado', error);
  }
}
