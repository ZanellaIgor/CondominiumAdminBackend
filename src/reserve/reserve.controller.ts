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
import { CreateReserveDto } from './dto/create-reserve.dto';
import { FindAllReserveDto } from './dto/filter-reserve.dto';
import { UpdateReserveDto } from './dto/update-reserve.dto';
import { ReserveService } from './reserve.service';

@Controller('reserve')
export class ReserveController {
  constructor(private readonly reserveService: ReserveService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createReserveDto: CreateReserveDto) {
    return this.reserveService.create(createReserveDto);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@Query() query: FindAllReserveDto) {
    return this.reserveService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reserveService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(@Param('id') id: string, @Body() updateReserveDto: UpdateReserveDto) {
    return this.reserveService.update(+id, updateReserveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reserveService.remove(+id);
  }
}
