import { Module } from '@nestjs/common';

import { PrismaService } from 'src/infra/prisma.service';
import { ReserveController } from './reserve.controller';
import { ReserveService } from './reserve.service';

@Module({
  controllers: [ReserveController],
  providers: [ReserveService, PrismaService],
})
export class ReserveModule {}
