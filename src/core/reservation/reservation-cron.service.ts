import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SituationReservation } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma.service';

@Injectable()
export class ReservationCronService {
  private readonly logger = new Logger(ReservationCronService.name);

  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async markReservationsAsFinished() {
    this.logger.log('🔄 Verificando reservas expiradas...');

    const now = new Date();

    const updatedReservations = await this.prisma.reservation.updateMany({
      where: {
        endDateTime: { lt: now },
        situation: { not: SituationReservation.FINALIZADO },
      },
      data: {
        situation: SituationReservation.FINALIZADO,
      },
    });

    this.logger.log(
      `${updatedReservations.count} reservas marcadas como FINALIZADO.`,
    );
  }
}
