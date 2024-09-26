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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CondominiumService } from './condominium.service';
import { CreateCondominiumDto } from './dto/create-condominium';
import { FindAllCondominiumDto } from './dto/filter-condominium';
import { UpdateCondominiumDto } from './dto/update-condominium';

@Controller('condominium')
export class CondominiumController {
  constructor(private readonly condominiumService: CondominiumService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createCondominiumDto: CreateCondominiumDto) {
    return this.condominiumService.create(createCondominiumDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@Query() query: FindAllCondominiumDto) {
    return this.condominiumService.findAll(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.condominiumService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(
    @Param('id') id: string,
    @Body() updateCondominiumDto: UpdateCondominiumDto,
  ) {
    return this.condominiumService.update(+id, updateCondominiumDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.condominiumService.remove(+id);
  }
}
