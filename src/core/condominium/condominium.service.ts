import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma.service';
import { CreateCondominiumDto } from './dto/create-condominium';
import { FindAllCondominiumDto } from './dto/filter-condominium';
import { UpdateCondominiumDto } from './dto/update-condominium';

@Injectable()
export class CondominiumService {
  constructor(private prisma: PrismaService) {}

  create(createCondominiumDto: CreateCondominiumDto) {
    return this.prisma.condominium.create({
      data: {
        ...createCondominiumDto,
      },
    });
  }

  async findAll(query: FindAllCondominiumDto) {
    const { page, limit, name } = query;
    const offset = (page - 1) * limit;

    const where = {
      ...(name && {
        name: {
          contains: name,
          mode: Prisma.QueryMode.insensitive,
        },
      }),
    };

    const space = await this.prisma.condominium.findMany({
      skip: offset,
      take: limit,
      where,
    });

    const totalCount = await this.prisma.condominium.count({ where });

    return {
      data: space,
      totalCount,
      page,
      limit,
    };
  }

  findOne(id: number) {
    return this.prisma.condominium.findUnique({ where: { id } });
  }

  update(id: number, updatecondominiumDto: UpdateCondominiumDto) {
    return this.prisma.condominium.update({
      where: { id },
      data: {
        ...updatecondominiumDto,
      },
    });
  }

  remove(id: number) {
    return this.prisma.condominium.delete({ where: { id } });
  }
}
