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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { AuthTokenGuard } from '../auth/guard/auth-token.guard';
import { CreateWarningDto } from './dto/create-warning.dto';
import { FindAllWarningsDto } from './dto/filter-warning.dto';
import { UpdateWarningDto } from './dto/update-warning.dto';
import { WarningsService } from './warnings.service';

@Controller('warnings')
export class WarningsController {
  constructor(private readonly warningsService: WarningsService) {}

  @Post()
  @UseGuards(AuthTokenGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createWarningDto: CreateWarningDto) {
    return this.warningsService.create(createWarningDto);
  }

  @Get()
  @UseGuards(AuthTokenGuard)
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
  @UseGuards(AuthTokenGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(@Param('id') id: string, @Body() updateWarningDto: UpdateWarningDto) {
    return this.warningsService.update(+id, updateWarningDto);
  }

  @Delete(':id')
  @UseGuards(AuthTokenGuard)
  remove(@Param('id') id: string) {
    return this.warningsService.remove(+id);
  }
}
