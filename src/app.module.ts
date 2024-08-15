// app.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from './infra/prisma.service';

import { ReservationModule } from './reservation/reservation.module';
import { ReservationService } from './reservation/reservation.service';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { WarningsModule } from './warnings/warnings.module';

@Module({
  imports: [WarningsModule, ReservationModule, UserModule],
  providers: [PrismaService, ReservationService, UserService],
})
export class AppModule {}

