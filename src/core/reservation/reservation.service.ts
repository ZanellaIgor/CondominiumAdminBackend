import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/infra/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { FindAllReservationDto } from './dto/filter-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  async create(createReserveDto: CreateReservationDto) {
    const { userId, condominiumId, spaceReservationId, apartamentId, ...data } =
      createReserveDto;
    return this.prisma.reservation.create({
      data: {
        ...data,
        condominium: { connect: { id: condominiumId } },
        apartament: { connect: { id: apartamentId } },
        user: { connect: { id: userId } },
        space: spaceReservationId
          ? { connect: { id: spaceReservationId } }
          : undefined,
      },
    });
  }

  async findAll(query: FindAllReservationDto) {
    const { page, limit, title, situation } = query;
    const offset = (page - 1) * limit;

    const where = {
      AND: [
        title ? { title: { contains: title } } : {},
        situation ? { situation: situation } : {},
      ],
    };

    const reserve = await this.prisma.reservation.findMany({
      skip: offset,
      take: limit,
      where,
      include: {
        space: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            apartments: true,
            id: true,
            name: true,
          },
        },
        condominium: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const totalCount = await this.prisma.reservation.count({ where });

    return {
      data: reserve,
      totalCount,
      page,
      limit,
    };
  }

  async findOne(id: number) {
    return this.prisma.reservation.findUnique({ where: { id } });
  }

  async update(id: number, updateReserveDto: UpdateReservationDto) {
    const { userId, condominiumId, spaceReservationId, apartamentId, ...data } =
      updateReserveDto;
    return this.prisma.reservation.update({
      where: { id },
      data: {
        ...data,
        condominium: condominiumId
          ? { connect: { id: condominiumId } }
          : undefined,
        user: userId ? { connect: { id: userId } } : undefined,
        apartament: { connect: { id: apartamentId } },
        space: spaceReservationId
          ? { connect: { id: spaceReservationId } }
          : undefined,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.reservation.delete({ where: { id } });
  }
}
