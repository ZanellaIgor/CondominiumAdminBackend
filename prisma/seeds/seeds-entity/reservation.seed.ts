import { SituationReservation } from 'src/utils/enum/status-reservation';
import { prismaSeed } from '../prisma-seeds';

export async function reservationSeed() {
  const data = {
    title: 'Reservado para reunião',
    description: 'Discutir novos projetos',
    startDateTime: new Date('2024-10-05T00:00:00Z'),
    endDateTime: new Date('2024-10-05T00:00:00Z'),
    space: { connect: { id: 1 } },
    situation: SituationReservation.CONFIRMADO,
    user: {
      connect: {
        id: 1,
      },
    },
    condominium: {
      connect: {
        id: 1,
      },
    },
    apartament: {
      connect: {
        id: 1,
      },
    },
  };

  try {
    await prismaSeed.reservation.upsert({
      where: { id: 1 },
      update: {},
      create: data,
    });
    console.log('Reserva criada com sucesso!');
  } catch (error) {
    console.log('Reserva não criada', error);
  }
}
