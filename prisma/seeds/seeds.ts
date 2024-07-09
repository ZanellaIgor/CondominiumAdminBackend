import { PrismaClient } from '@prisma/client';
import { apartmentSeed } from './seeds-entity/apartment.seed';
import { userSeed } from './seeds-entity/user.seed';
import { warningSeed } from './seeds-entity/warning.seed';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Seeds executados com sucesso!');
    await apartmentSeed(prisma);
    await userSeed(prisma);
    await warningSeed(prisma);
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
