import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma.service';
import { CreateCondominiumDto } from './dto/create-condominium';
import { FindAllCondominiumDto } from './dto/filter-condominium';
import { PaginatedCondominiumResponseDto } from './dto/response-paginated-condominium.dto';
import { UpdateCondominiumDto } from './dto/update-condominium';

@Injectable()
export class CondominiumService {
  constructor(private prisma: PrismaService) {}

  async create(createCondominiumDto: CreateCondominiumDto) {
    const condominium = await this.prisma.condominium.create({
      data: {
        ...createCondominiumDto,
      },
    });
    if (!condominium) {
      throw new HttpException(
        'Não foi possível criar o Condomínio',
        HttpStatus.BAD_REQUEST,
      );
    }
    throw new HttpException(
      'Condomínio criado com sucesso!',
      HttpStatus.CREATED,
    );
  }

  async findAll(
    query: FindAllCondominiumDto,
  ): Promise<PaginatedCondominiumResponseDto> {
    const { page, limit, name, condominiumIds } = query;
    const offset = (page - 1) * limit;

    const where = {
      ...(name && {
        name: {
          contains: name,
          mode: Prisma.QueryMode.insensitive,
        },
      }),
      ...(!!condominiumIds?.length && {
        id: {
          in: condominiumIds,
        },
      }),
    };

    const condominium = await this.prisma.condominium.findMany({
      skip: offset,
      take: limit,
      where,
    });

    const totalCount = await this.prisma.condominium.count({ where });

    return {
      data: condominium,
      totalCount,
      page,
      limit,
    };
  }

  findOne(id: number) {
    return this.prisma.condominium.findUnique({ where: { id } });
  }

  async update(id: number, updatecondominiumDto: UpdateCondominiumDto) {
    const condominium = await this.prisma.condominium.update({
      where: { id },
      data: {
        ...updatecondominiumDto,
      },
    });
    if (!condominium) {
      throw new HttpException(
        'Não foi possível editar o condomínio',
        HttpStatus.BAD_REQUEST,
      );
    }
    throw new HttpException('Condomínio editado com sucesso!', HttpStatus.OK);
  }
}
