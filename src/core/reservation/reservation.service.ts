import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/infra/prisma.service';
import { IResponse } from 'src/utils/interfaces/response.interface';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { FindAllReservationDto } from './dto/filter-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  async create(createReserveDto: CreateReservationDto): Promise<IResponse> {
    const {
      userId,
      condominiumId,
      spaceReservationId,
      apartmentId,
      startDateTime,
      endDateTime,
      ...data
    } = createReserveDto;

    // Validação 1: Verificar se startDateTime é anterior a endDateTime
    if (startDateTime >= endDateTime) {
      throw new HttpException(
        'A data de início deve ser anterior à data de fim',
        HttpStatus.BAD_REQUEST,
      );
    }

    const conflictingReservation = await this.prisma.reservation.findFirst({
      where: {
        spaceReservationId,
        OR: [
          {
            startDateTime: { lte: endDateTime },
            endDateTime: { gte: startDateTime },
          },
        ],
      },
    });

    if (conflictingReservation) {
      throw new HttpException(
        'Já existe uma reserva para este espaço no horário informado',
        HttpStatus.CONFLICT,
      );
    }

    const reserve = await this.prisma.reservation.create({
      data: {
        ...data,
        startDateTime,
        endDateTime,
        condominium: { connect: { id: condominiumId } },
        apartament: apartmentId ? { connect: { id: apartmentId } } : undefined,
        user: { connect: { id: userId } },
        space: { connect: { id: spaceReservationId } },
      },
    });

    if (!reserve) {
      throw new HttpException(
        'Não foi possível criar a reserva',
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Reserva criada com sucesso!',
    };
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
        apartament: {
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

  async update(
    id: number,
    updateReserveDto: UpdateReservationDto,
  ): Promise<IResponse> {
    const { description, situation, ...data } = updateReserveDto;
    const reserve = await this.prisma.reservation.update({
      where: { id },
      data: {
        ...(situation && { situation: situation }),
        ...(description && { description: description }),
      },
    });
    if (!reserve) {
      throw new HttpException(
        'Não foi possível editar a reserva',
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Reserva editada com sucesso!',
    };
  }

  async remove(id: number) {
    return this.prisma.reservation.delete({ where: { id } });
  }
}
