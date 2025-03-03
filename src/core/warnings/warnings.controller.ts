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

import { Role } from '@prisma/client';
import { AuthTokenGuard } from '../auth/guard/auth-token.guard';
import { Roles } from '../common/decorators/role.decorator';

import { InjectContext } from '../common/decorators/context.decorator';
import { ContextGuard } from '../common/guards/context.guard';
import { RolesGuard } from '../common/guards/role.guard';

import { BodyContextInterceptor } from '../common/interceptor/body-context.interceptor';
import { QueryContextInterceptor } from '../common/interceptor/query-context.interceptor';
import { CreateWarningDto } from './dto/create-warning.dto';
import { FindAllWarningsDto } from './dto/filter-warning.dto';
import { UpdateWarningDto } from './dto/update-warning.dto';
import { WarningsService } from './warnings.service';

@Controller('warnings')
export class WarningsController {
  constructor(private readonly warningsService: WarningsService) {}

  @Post()
  @UseInterceptors(BodyContextInterceptor)
  @InjectContext('userId', 'condominiumId')
  @UseGuards(AuthTokenGuard, ContextGuard)
  create(@Body() createWarningDto: CreateWarningDto) {
    return this.warningsService.create(createWarningDto);
  }

  @Get()
  @UseGuards(AuthTokenGuard)
  @UseInterceptors(QueryContextInterceptor)
  @InjectContext('condominiumId')
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@Query() query: FindAllWarningsDto) {
    return this.warningsService.findAll(query);
  }

  @Get(':id')
  @UseGuards(AuthTokenGuard)
  findOne(@Param('id') id: string) {
    return this.warningsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthTokenGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(@Param('id') id: string, @Body() updateWarningDto: UpdateWarningDto) {
    return this.warningsService.update(+id, updateWarningDto);
  }

  @Delete(':id')
  @UseGuards(AuthTokenGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  remove(@Param('id') id: string) {
    return this.warningsService.remove(+id);
  }
}
