import { Module } from '@nestjs/common';
import { ApartamentController } from './apartament.controller';
import { ApartamentService } from './apartament.service';

@Module({
  controllers: [ApartamentController],
  providers: [ApartamentService],
})
export class ApartamentModule {}
