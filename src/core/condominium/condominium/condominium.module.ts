import { Module } from '@nestjs/common';

import { PrismaService } from 'src/infra/prisma.service';
import { CondominiumController } from './condominium.controller';
import { CondominiumService } from './condominium.service';

@Module({
  controllers: [CondominiumController],
  providers: [CondominiumService, PrismaService],
})
export class CondominiumModule {}
