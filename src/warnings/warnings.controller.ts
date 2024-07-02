import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Prisma, Warning as WarningModel } from '@prisma/client';
import { WarningsService } from './warnings.service';

@Controller('warnings')
export class WarningsController {
  constructor(private readonly warningsService: WarningsService) {}

  @Post()
  async createWarning(
    @Body() data: Prisma.WarningCreateInput,
  ): Promise<WarningModel> {
    return this.warningsService.createWarning(data);
  }

  @Get()
  async getWarnings(): Promise<WarningModel[]> {
    console.log('oi');
    return this.warningsService.getWarnings();
  }

  @Get(':id')
  async getWarningById(@Param('id') id: number): Promise<WarningModel> {
    return this.warningsService.getWarningById(id);
  }

  @Patch(':id')
  async updateWarning(
    @Param('id') id: number,
    @Body() data: Prisma.WarningUpdateInput,
  ): Promise<WarningModel> {
    return this.warningsService.updateWarning(id, data);
  }

  @Delete(':id')
  async deleteWarning(@Param('id') id: number): Promise<WarningModel> {
    return this.warningsService.deleteWarning(id);
  }
}
