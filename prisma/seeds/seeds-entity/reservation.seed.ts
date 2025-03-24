import { Logger } from '@nestjs/common';
import { SituationReservation } from '@prisma/client';
import { prismaSeed } from '../prisma-seeds';

export async function reservationSeed() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + 7);

  const reservationsData = [
    {
      title: 'Reunião de Condomínio',
      description: 'Reunião geral de moradores.',
      startDateTime: futureDate,
      endDateTime: new Date(futureDate.getTime() + 3600000),
      spaceId: 1,
      situation: SituationReservation.CONFIRMADO,
      userId: 1,
      condominiumId: 1,
      apartamentId: 1,
    },
    {
      title: 'Festa de Aniversário',
      description: 'Festa de aniversário no salão de festas.',
      startDateTime: futureDate,
      endDateTime: new Date(futureDate.getTime() + 7200000),
      spaceId: 2,
      situation: SituationReservation.ABERTO,
      userId: 2,
      condominiumId: 1,
      apartamentId: 2,
    },
    {
      title: 'Aula de Yoga',
      description: 'Aula de yoga no espaço zen.',
      startDateTime: futureDate,
      endDateTime: new Date(futureDate.getTime() + 5400000),
      spaceId: 10,
      situation: SituationReservation.ANALISE,
      userId: 13,
      condominiumId: 2,
      apartamentId: 13,
    },
    {
      title: 'Churrasco com Amigos',
      description: 'Churrasco na área da churrasqueira.',
      startDateTime: futureDate,
      endDateTime: new Date(futureDate.getTime() + 10800000),
      spaceId: 5,
      situation: SituationReservation.REPROVADO,
      userId: 26,
      condominiumId: 3,
      apartamentId: 25,
    },
    {
      title: 'Evento Passado',
      description: 'Evento que já ocorreu.',
      startDateTime: yesterday,
      endDateTime: new Date(yesterday.getTime() + 7200000),
      spaceId: 3,
      situation: SituationReservation.FINALIZADO,
      userId: 1,
      condominiumId: 1,
      apartamentId: 1,
    },
    {
      title: 'Evento Cancelado',
      description: 'Evento cancelado.',
      startDateTime: futureDate,
      endDateTime: new Date(futureDate.getTime() + 7200000),
      spaceId: 4,
      situation: SituationReservation.CANCELADO,
      userId: 1,
      condominiumId: 1,
      apartamentId: 1,
    },
  ];

  try {
    for (const reservation of reservationsData) {
      await prismaSeed.reservation.create({
        data: {
          title: reservation.title,
          description: reservation.description,
          startDateTime: reservation.startDateTime,
          endDateTime: reservation.endDateTime,
          space: { connect: { id: reservation.spaceId } },
          situation: reservation.situation,
          user: { connect: { id: reservation.userId } },
          condominium: { connect: { id: reservation.condominiumId } },
          apartment: { connect: { id: reservation.apartamentId } },
        },
      });
    }

    Logger.log('Reservas criadas com sucesso!');
  } catch (error) {
    Logger.error('Erro ao criar reservas', error);
  }
}
