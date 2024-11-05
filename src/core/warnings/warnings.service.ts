import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma.service';
import { CreateWarningDto } from './dto/create-warning.dto';
import { FindAllWarningsDto } from './dto/filter-warning.dto';
import { UpdateWarningDto } from './dto/update-warning.dto';

@Injectable()
export class WarningsService {
  constructor(private prisma: PrismaService) {}

  create(createWarningDto: CreateWarningDto) {
    const { userId, condominiumId, ...data } = createWarningDto;
    return this.prisma.warning.create({
      data: {
        ...data,
        condominium: { connect: { id: condominiumId } },
        user: { connect: { id: userId } },
      },
    });
  }

  async findAll(query: FindAllWarningsDto) {
    const { page, limit, title, category, situation } = query;
    const offset = (page - 1) * limit;

    const where = {
      AND: [
        title ? { title: { contains: title } } : {},
        category ? { category: category } : {},
        situation ? { situation: situation } : {},
      ],
    };

    const warnings = await this.prisma.warning.findMany({
      skip: offset,
      take: limit,
      where,
    });

    const totalCount = await this.prisma.warning.count({ where });

    return {
      data: warnings,
      totalCount,
      page,
      limit,
    };
  }

  findOne(id: number) {
    return this.prisma.warning.findUnique({ where: { id } });
  }

  update(id: number, updateWarningDto: UpdateWarningDto) {
    const { userId, condominiumId, ...data } = updateWarningDto;
    return this.prisma.warning.update({
      where: { id },
      data: {
        ...data,
        condominium: condominiumId
          ? { connect: { id: condominiumId } }
          : undefined,
        user: userId ? { connect: { id: userId } } : undefined,
      },
    });
  }

  remove(id: number) {
    return this.prisma.warning.delete({ where: { id } });
  }
}
