import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
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
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createReserveDto: CreateSpaceReservationDto) {
    return this.spaceReservationService.create(createReserveDto);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@Query() query: FindAllSpaceReservationDto) {
    return this.spaceReservationService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.spaceReservationService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateSpaceReservationDto,
  ) {
    return this.spaceReservationService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spaceReservationService.remove(+id);
  }
}
