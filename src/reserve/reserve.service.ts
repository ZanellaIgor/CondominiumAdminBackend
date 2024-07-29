import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infra/prisma.service';

import { CreateReserveDto, UpdateReserveDto } from './dto/create-reserve.dto';
import { FindAllReserveDto } from './dto/filter-reserve.dto';

@Injectable()
export class ReserveService {
  constructor(private prisma: PrismaService) {}

  create(createReserveDto: CreateReserveDto) {
    const { userId, condominiumId, spaceReservationId, ...data } =
      createReserveDto;
    return this.prisma.reservation.create({
      data: {
        ...data,
        condominium: { connect: { id: condominiumId } },
        user: { connect: { id: userId } },
        space: spaceReservationId
          ? { connect: { id: spaceReservationId } }
          : undefined,
      },
    });
  }

  async findAll(query: FindAllReserveDto) {
    const { page, limit, title } = query;
    const offset = (page - 1) * limit;

    const where = {
      AND: [title ? { title: { contains: title } } : {}],
    };

    const reserve = await this.prisma.reservation.findMany({
      skip: offset,
      take: limit,
      where,
    });

    const totalCount = await this.prisma.reservation.count({ where });

    return {
      data: reserve,
      totalCount,
      page,
      limit,
    };
  }

  findOne(id: number) {
    return this.prisma.reservation.findUnique({ where: { id } });
  }

  update(id: number, updateReserveDto: UpdateReserveDto) {
    const { userId, condominiumId, spaceReservationId, ...data } =
      updateReserveDto;
    return this.prisma.reservation.update({
      where: { id },
      data: {
        ...data,
        condominium: condominiumId
          ? { connect: { id: condominiumId } }
          : undefined,
        user: userId ? { connect: { id: userId } } : undefined,
        space: spaceReservationId
          ? { connect: { id: spaceReservationId } }
          : undefined,
      },
    });
  }

  remove(id: number) {
    return this.prisma.reservation.delete({ where: { id } });
  }
}
