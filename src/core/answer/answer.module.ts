import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma.service';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService, PrismaService],
})
export class AnswerModule {}
