import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    console.log(data);
    const teste = this.prisma.user.create({ data });
    console.log(teste);
    return teste;
  }

  async findAll(query: FindAllUserDto) {
    const { page, limit, email } = query;
    const offset = (page - 1) * limit;

    const where = {
      AND: [email ? { email: { contains: email } } : {}],
    };

    const users = await this.prisma.user.findMany({
      skip: offset,
      take: limit,
      where,
    });

    const totalCount = await this.prisma.user.count({ where });
    return {
      data: users,
      totalCount,
      page,
      limit,
    };
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
