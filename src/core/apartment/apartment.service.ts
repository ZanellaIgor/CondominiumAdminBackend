import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { FindAllApartmentDto } from './dto/filter-apartment.dto';
import { PaginatedApartmentsResponseDto } from './dto/response-paginated-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';

@Injectable()
export class ApartmentService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateApartmentDto) {
    const { condominiumId, ...rest } = data;

    const apartment = await this.prisma.apartment.create({
      data: {
        ...rest,
        condominium: {
          connect: { id: condominiumId },
        },
      },
    });
    if (!apartment) {
      throw new HttpException(
        'Não foi possível criar o apartamento',
        HttpStatus.BAD_REQUEST,
      );
    }
    throw new HttpException(
      'Apartamento criado com sucesso!',
      HttpStatus.CREATED,
    );
  }

  async findAll(
    query: FindAllApartmentDto,
  ): Promise<PaginatedApartmentsResponseDto> {
    const { page = 1, limit = 10, condominiumIds, name, userId } = query;
    const offset = (page - 1) * limit;

    const where: Prisma.ApartmentWhereInput = {};

    if (condominiumIds && condominiumIds.length > 0) {
      where.condominiumId = { in: condominiumIds };
    }

    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      };
    }

    if (userId) {
      where.users = {
        some: {
          id: Number(userId),
        },
      };
    }

    const apartment = await this.prisma.apartment.findMany({
      skip: offset,
      take: limit,
      where,
      include: {
        condominium: true,
      },
    });

    const totalCount = await this.prisma.apartment.count({ where });
    return {
      data: apartment,
      totalCount,
      page,
      limit,
    };
  }

  async findOne(id: number) {
    return this.prisma.apartment.findUnique({
      where: { id },
      include: {
        condominium: true,
      },
    });
  }

  async update(id: number, data: UpdateApartmentDto) {
    const updateApartment = await this.prisma.apartment.update({
      where: { id: Number(id) },
      data,
    });
    if (!updateApartment) {
      throw new HttpException(
        'Não foi editar o apartamento',
        HttpStatus.BAD_REQUEST,
      );
    }
    throw new HttpException('Apartamento editado com sucesso!', HttpStatus.OK);
  }

  async remove(id: number) {
    return this.prisma.apartment.delete({ where: { id } });
  }
}
