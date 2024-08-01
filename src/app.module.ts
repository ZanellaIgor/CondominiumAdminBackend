// app.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from './infra/prisma.service';

import { ReserveModule } from './reserve/reserve.module';
import { ReserveService } from './reserve/reserve.service';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { WarningsModule } from './warnings/warnings.module';

@Module({
  imports: [WarningsModule, ReserveModule, UserModule],
  providers: [PrismaService, ReserveService, UserService],
})
export class AppModule {}
