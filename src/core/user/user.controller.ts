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

import { AuthTokenGuard } from '../auth/guard/auth-token.guard';
import { Roles } from '../common/decorators/role.decorator';

import { RolesGuard } from '../common/guards/role.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { UserCreateGuard } from '../common/guards/user-create.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(AuthTokenGuard, RolesGuard, UserCreateGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthTokenGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  findAll(@Query() query: FindAllUserDto) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  @UseGuards(AuthTokenGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthTokenGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthTokenGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MASTER)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
