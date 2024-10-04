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
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../decorators/role.decorator';
import { RolesGuard } from '../guards/role.guard';
import { CreateSpaceReservationDto } from './dto/create-space-reservation';
import { FindAllSpaceReservationDto } from './dto/filter-space-reservation';
import { UpdateSpaceReservationDto } from './dto/update-space-reservation';
import { SpaceReservationService } from './space-reservation.service';

@Controller('space-reservation')
export class SpaceReservationController {
  constructor(
    private readonly spaceReservationService: SpaceReservationService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createReserveDto: CreateSpaceReservationDto) {
    return this.spaceReservationService.create(createReserveDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@Query() query: FindAllSpaceReservationDto) {
    return this.spaceReservationService.findAll(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  findOne(@Param('id') id: string) {
    return this.spaceReservationService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateSpaceReservationDto,
  ) {
    return this.spaceReservationService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  remove(@Param('id') id: string) {
    return this.spaceReservationService.remove(+id);
  }
}
