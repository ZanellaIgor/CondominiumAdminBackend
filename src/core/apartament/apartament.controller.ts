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
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../decorators/role.decorator';
import { RolesGuard } from '../guards/role.guard';
import { ApartamentService } from './apartament.service';
import { CreateApartamentDto } from './dto/create-apartament.dto';
import { FindAllApartamentDto } from './dto/filter-apartament.dto';
import { UpdateApartamentDto } from './dto/update-apartament.dto';

@Controller('apartament')
export class ApartamentController {
  constructor(private readonly apartamentService: ApartamentService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  create(@Body() createApartamentDto: CreateApartamentDto) {
    return this.apartamentService.create(createApartamentDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  findAll(@Query() query: FindAllApartamentDto) {
    return this.apartamentService.findAll(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  findOne(@Param('id') id: string) {
    return this.apartamentService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateApartamentDto) {
    return this.apartamentService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  remove(@Param('id') id: string) {
    return this.apartamentService.remove(+id);
  }
}
