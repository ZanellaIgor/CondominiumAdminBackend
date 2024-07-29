// app.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from './infra/prisma.service';

import { ReserveModule } from './reserve/reserve.module';
import { ReserveService } from './reserve/reserve.service';
import { WarningsModule } from './warnings/warnings.module';

@Module({
  imports: [WarningsModule, ReserveModule],
  providers: [PrismaService, ReserveService],
})
export class AppModule {}
