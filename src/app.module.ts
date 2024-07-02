// app.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from './infra/prisma.service';
import { WarningsModule } from './warnings/warnings.module';

@Module({
  imports: [WarningsModule],
  providers: [PrismaService],
})
export class AppModule {}
