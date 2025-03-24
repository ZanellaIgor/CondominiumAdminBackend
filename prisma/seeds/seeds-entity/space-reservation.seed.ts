import { Logger } from '@nestjs/common';
import { prismaSeed } from '../prisma-seeds';

const spaceReservationsSeed = [
  // Condomínio 1
  { name: 'Sala de Reuniões', condominiumId: 1 },
  { name: 'Brinquedoteca', condominiumId: 1 },
  { name: 'Cinema', condominiumId: 1 },
  { name: 'Espaço Zen', condominiumId: 1 },
  { name: 'Ateliê', condominiumId: 1 },
  { name: 'Sala de Massagem', condominiumId: 3 },

  // Condomínio 2
  { name: 'Sala de Estudos', condominiumId: 2 },
  { name: 'Pista de Skate', condominiumId: 2 },
  { name: 'Oficina de Bicicletas', condominiumId: 2 },
  { name: 'Espaço Coworking', condominiumId: 2 },
  { name: 'Sauna', condominiumId: 2 },

  // Condomínio 3
  { name: 'Sala de Música', condominiumId: 3 },
  { name: 'Espaço de Dança', condominiumId: 3 },
  { name: 'Horta Comunitária', condominiumId: 3 },
  { name: 'Espaço de Leitura', condominiumId: 3 },
];

export async function spaceReservationSeed() {
  try {
    for (const space of spaceReservationsSeed) {
      await prismaSeed.spaceReservation.createMany({
        data: space,
        skipDuplicates: true,
      });
    }

    Logger.log('Espaços criados com sucesso!');
  } catch (error) {
    Logger.error('Espaços não criados', error);
  }
}
