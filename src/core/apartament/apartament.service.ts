import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma.service';
import { CreateApartamentDto } from './dto/create-apartament.dto';
import { FindAllApartamentDto } from './dto/filter-apartament.dto';
import { UpdateApartamentDto } from './dto/update-apartament.dto';

@Injectable()
export class ApartamentService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateApartamentDto) {
    const { condominiumId, ...rest } = data;

    const apartament = this.prisma.apartment.create({
      data: {
        ...rest,
        condominium: {
          connect: { id: condominiumId },
        },
      },
    });
    if (!apartament) {
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

  async findAll(query: FindAllApartamentDto) {
    const { page = 1, limit = 10, condominiumIds, name, userId } = query;
    const offset = (page - 1) * limit;

    const where: any = {};

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

    const apartament = await this.prisma.apartment.findMany({
      skip: offset,
      take: limit,
      where,
      include: {
        condominium: true,
      },
    });

    const totalCount = await this.prisma.apartment.count({ where });
    return {
      data: apartament,
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

  async update(id: number, data: UpdateApartamentDto) {
    const updateApartament = await this.prisma.apartment.update({
      where: { id: Number(id) },
      data,
    });

    return updateApartament;
  }

  async remove(id: number) {
    return this.prisma.apartment.delete({ where: { id } });
  }
}
