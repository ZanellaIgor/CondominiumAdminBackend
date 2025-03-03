import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { AuthTokenGuard } from '../auth/guard/auth-token.guard';
import { InjectContext } from '../common/decorators/context.decorator';
import { ContextGuard } from '../common/guards/context.guard';

import { BodyContextInterceptor } from '../common/interceptor/body-context.interceptor';
import { QueryContextInterceptor } from '../common/interceptor/query-context.interceptor';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { FindAllMaintenanceDto } from './dto/filter-reservation.dto';
import { MaintenanceService } from './maintenance.service';

@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Post()
  @UseInterceptors(BodyContextInterceptor)
  @InjectContext('userId', 'condominiumId')
  @UseGuards(AuthTokenGuard, ContextGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createReserveDto: CreateMaintenanceDto) {
    return this.maintenanceService.create(createReserveDto);
  }

  @Get()
  @UseInterceptors(QueryContextInterceptor)
  @InjectContext('condominiumIds')
  @UseGuards(AuthTokenGuard, ContextGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@Query() query: FindAllMaintenanceDto) {
    return this.maintenanceService.findAll(query);
  }

  @Get(':id')
  @UseGuards(AuthTokenGuard, ContextGuard)
  findOne(@Param('id') id: string) {
    return this.maintenanceService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthTokenGuard, ContextGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(
    @Param('id') id: string,
    @Body() updateMaintenanceDto: CreateMaintenanceDto,
  ) {
    return this.maintenanceService.update(+id, updateMaintenanceDto);
  }

  @Delete(':id')
  @UseGuards(AuthTokenGuard)
  remove(@Param('id') id: string) {
    return this.maintenanceService.remove(+id);
  }
}
