import { Module } from '@nestjs/common';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';

import { PrismaService } from 'src/infra/prisma.service';
import { QuestionModule } from '../question/question.module';

@Module({
  imports: [QuestionModule],
  controllers: [SurveyController],
  providers: [SurveyService, PrismaService],
})
export class SurveyModule {}
