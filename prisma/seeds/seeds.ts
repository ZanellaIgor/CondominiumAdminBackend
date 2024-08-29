import { PrismaClient } from '@prisma/client';
import { apartmentSeed } from './seeds-entity/apartment.seed';
import { reservationSeed } from './seeds-entity/reservation.seed';
import { spaceSeed } from './seeds-entity/space.seed';
import { userSeed } from './seeds-entity/user.seed';
import { warningSeed } from './seeds-entity/warning.seed';

const prisma = new PrismaClient();

async function main() {
  try {
    await apartmentSeed();
    await userSeed();
    await spaceSeed();
    await warningSeed();
    await reservationSeed();
    console.log('Seeds executados com sucesso!');
  } catch (error) {
    console.error('Erro ao executar os seeds:', error);
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
