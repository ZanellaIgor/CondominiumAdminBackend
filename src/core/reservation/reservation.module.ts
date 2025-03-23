import { Module } from '@nestjs/common';

import { ReservationCronService } from './reservation-cron.service';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';

@Module({
  controllers: [ReservationController],
  providers: [ReservationService, ReservationCronService],
})
export class ReservationModule {}
