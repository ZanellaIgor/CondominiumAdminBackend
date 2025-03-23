import { Logger } from '@nestjs/common';
import { prismaSeed } from '../prisma-seeds';

const apartamentsSeed = [
  // Condomínio 1 (4 apartamentos por andar)
  { name: 'Apto 101', condominiumId: 1 },
  { name: 'Apto 102', condominiumId: 1 },
  { name: 'Apto 103', condominiumId: 1 },
  { name: 'Apto 104', condominiumId: 1 },
  { name: 'Apto 201', condominiumId: 1 },
  { name: 'Apto 202', condominiumId: 1 },
  { name: 'Apto 203', condominiumId: 1 },
  { name: 'Apto 204', condominiumId: 1 },
  { name: 'Apto 301', condominiumId: 1 },
  { name: 'Apto 302', condominiumId: 1 },
  { name: 'Apto 303', condominiumId: 1 },
  { name: 'Apto 304', condominiumId: 1 },

  // Condomínio 2 (3 apartamentos por andar)
  { name: 'Apto 101', condominiumId: 2 },
  { name: 'Apto 102', condominiumId: 2 },
  { name: 'Apto 103', condominiumId: 2 },
  { name: 'Apto 201', condominiumId: 2 },
  { name: 'Apto 202', condominiumId: 2 },
  { name: 'Apto 203', condominiumId: 2 },
  { name: 'Apto 301', condominiumId: 2 },
  { name: 'Apto 302', condominiumId: 2 },
  { name: 'Apto 303', condominiumId: 2 },
  { name: 'Apto 401', condominiumId: 2 },
  { name: 'Apto 402', condominiumId: 2 },
  { name: 'Apto 403', condominiumId: 2 },

  // Condomínio 3 (2 apartamentos por andar)
  { name: 'Apto 101', condominiumId: 3 },
  { name: 'Apto 102', condominiumId: 3 },
  { name: 'Apto 201', condominiumId: 3 },
  { name: 'Apto 202', condominiumId: 3 },
  { name: 'Apto 301', condominiumId: 3 },
  { name: 'Apto 302', condominiumId: 3 },
  { name: 'Apto 401', condominiumId: 3 },
  { name: 'Apto 402', condominiumId: 3 },
  { name: 'Apto 501', condominiumId: 3 },
  { name: 'Apto 502', condominiumId: 3 },
  { name: 'Apto 601', condominiumId: 3 },
  { name: 'Apto 602', condominiumId: 3 },
];

export async function apartmentSeed() {
  try {
    await prismaSeed.apartment.createMany({
      data: apartamentsSeed,
    });

    Logger.log('Apartamentos criado ou atualizado com sucesso!');
  } catch (error) {
    Logger.error('Erro ao criar ou atualizar o apartamentos', error);
  }
}
