import { PrismaClient } from '@prisma/client';
import { apartmentSeed } from './seeds-entity/apartment.seed';
import { condominiumSeed } from './seeds-entity/condominium.seed';
import { reservationSeed } from './seeds-entity/reservation.seed';
import { spaceSeed } from './seeds-entity/space.seed';
import { userSeed } from './seeds-entity/user.seed';
import { warningSeed } from './seeds-entity/warning.seed';

const prisma = new PrismaClient();

async function main() {
  try {
    await condominiumSeed();
    await apartmentSeed();
    await spaceSeed();
    await userSeed();
    await reservationSeed();
    await warningSeed();
    console.log('Seeds executados com sucesso!');
  } catch (error) {
    console.error('Erro ao executar os seeds:', error);
    throw new Error('Erro ao executar os seeds:');
  } finally {
    await prisma.$disconnect();
  }
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
