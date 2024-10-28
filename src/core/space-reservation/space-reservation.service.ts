import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/infra/prisma.service';
import { CreateSpaceReservationDto } from './dto/create-space-reservation';
import { FindAllSpaceReservationDto } from './dto/filter-space-reservation';
import { UpdateSpaceReservationDto } from './dto/update-space-reservation';

@Injectable()
export class SpaceReservationService {
  constructor(private prisma: PrismaService) {}

  async create(createSpaceReservationDto: CreateSpaceReservationDto) {
    const { condominiumId, ...data } = createSpaceReservationDto;
    const spaceReservation = this.prisma.spaceReservation.create({
      data: {
        ...data,
        condominium: { connect: { id: condominiumId } },
      },
    });

    if (!spaceReservation) {
      throw new HttpException(
        'Não foi possível criar o Espaço de reserva',
        HttpStatus.BAD_REQUEST,
      );
    }
    throw new HttpException(
      'Espaço de reserva criado com sucesso!',
      HttpStatus.CREATED,
    );
  }

  async findAll(query: FindAllSpaceReservationDto) {
    const { page, limit, name } = query;
    const offset = (page - 1) * limit;

    const where = {
      AND: [name ? { name: { contains: name } } : {}],
    };

    const space = await this.prisma.spaceReservation.findMany({
      skip: offset,
      take: limit,
      where,
      select: {
        id: true,
        name: true,
        condominium: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const totalCount = await this.prisma.spaceReservation.count({ where });

    return {
      data: space,
      totalCount,
      page,
      limit,
    };
  }

  async findOne(id: number) {
    return await this.prisma.spaceReservation.findUnique({ where: { id } });
  }

  async update(
    id: number,
    updateSpaceReservationDto: UpdateSpaceReservationDto,
  ) {
    const { condominiumId, ...data } = updateSpaceReservationDto;
    const spaceReservation = await this.prisma.spaceReservation.update({
      where: { id },
      data: {
        ...data,
        condominium: condominiumId
          ? { connect: { id: condominiumId } }
          : undefined,
      },
    });

    if (!spaceReservation) {
      throw new HttpException(
        'Não foi possível editar o Espaço de reserva',
        HttpStatus.BAD_REQUEST,
      );
    }
    throw new HttpException(
      'Espaço de reserva editado com sucesso!',
      HttpStatus.OK,
    );
  }

  remove(id: number) {
    return this.prisma.spaceReservation.delete({ where: { id } });
  }
}
