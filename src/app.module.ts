// app.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from './infra/prisma.service';

import { ReservationModule } from './core/reservation/reservation.module';
import { ReservationService } from './core/reservation/reservation.service';
import { UserModule } from './core/user/user.module';
import { UserService } from './core/user/user.service';
import { WarningsModule } from './core/warnings/warnings.module';

@Module({
  imports: [WarningsModule, ReservationModule, UserModule],
  providers: [PrismaService, ReservationService, UserService],
})
export class AppModule {}
