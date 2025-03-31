import { PrismaClient } from '@prisma/client';
import { apartmentSeed } from './seeds-entity/apartment.seed';
import { condominiumSeed } from './seeds-entity/condominium.seed';
import { reservationSeed } from './seeds-entity/reservation.seed';

import { Logger } from '@nestjs/common';
import { spaceReservationSeed } from './seeds-entity/space-reservation.seed';
import { userSeed } from './seeds-entity/user.seed';
import { warningSeed } from './seeds-entity/warning.seed';
import { maintenanceSeed } from './seeds-entity/maintenance.seed';
import { surveySeed } from './seeds-entity/survey.seed';
import { answerSeed } from './seeds-entity/answer.seed';

const prisma = new PrismaClient();

async function main() {
  try {
    await condominiumSeed();
    await apartmentSeed();
    await spaceReservationSeed();
    await userSeed();
    await reservationSeed();
    await warningSeed();
    await maintenanceSeed();
    await surveySeed();
    await answerSeed();

    Logger.log('Seeds executados com sucesso!');
  } catch (error) {
    Logger.error('Erro ao executar os seeds:', error);

    throw new Error('Erro ao executar os seeds:');
  } finally {
    await prisma.$disconnect();
  }
}
main()
  .catch((e) => {
    Logger.error('Erro ao executar os seeds:', e);
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
