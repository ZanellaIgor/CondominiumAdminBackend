import { Module } from '@nestjs/common';

import { PrismaService } from 'src/infra/prisma.service';
import { SpaceReservationController } from './space-reservation.controller';
import { SpaceReservationService } from './space-reservation.service';

@Module({
  controllers: [SpaceReservationController],
  providers: [SpaceReservationService, PrismaService],
})
export class SpaceReservationModule {}
