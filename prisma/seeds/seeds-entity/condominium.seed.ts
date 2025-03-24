import { Logger } from '@nestjs/common';
import { prismaSeed } from '../prisma-seeds';

const condominiumSeedData = [
  { name: 'Condomínio Sol' },
  { name: 'Condomínio Neblina' },
  { name: 'Condomínio Lua' },
];

export async function condominiumSeed() {
  try {
    await prismaSeed.condominium.createMany({
      data: condominiumSeedData,
    });
    Logger.log('Condominio criado com sucesso!');
  } catch (error) {
    Logger.error('Condominio não criado', error);
  }
}
