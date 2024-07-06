import { Module } from '@nestjs/common';

import { PrismaService } from 'src/infra/prisma.service';
import { WarningsController } from './warnings.controller';
import { WarningsService } from './warnings.service';

@Module({
  controllers: [WarningsController],
  providers: [WarningsService, PrismaService],
})
export class WarningsModule {}
