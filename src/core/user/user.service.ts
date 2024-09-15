import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const { apartmentId, condominiumIds, ...rest } = data;

    return this.prisma.user.create({
      data: {
        ...rest,
        apartment: apartmentId ? { connect: { id: apartmentId } } : undefined,
        // Conecta os condomínios
        condominiums: {
          connect: condominiumIds.map((id) => ({ id })),
        },
      },
    });
  }

  async findAll(query: FindAllUserDto) {
    const { page = 1, limit = 10, email } = query;
    const offset = (page - 1) * limit;

    const where = {
      AND: [email ? { email: { contains: email } } : {}],
    };

    const users = await this.prisma.user.findMany({
      skip: offset,
      take: limit,
      where,
      include: {
        apartment: true,
        condominiums: true,
      },
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
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        apartment: true,
        condominiums: true,
      },
    });
  }

  async update(id: number, data: UpdateUserDto) {
    const { apartmentId, condominiumIds, ...rest } = data;

    return this.prisma.user.update({
      where: { id },
      data: {
        ...rest,
        apartment: apartmentId ? { connect: { id: apartmentId } } : undefined,
        condominiums: condominiumIds
          ? { set: condominiumIds.map((id) => ({ id })) }
          : undefined,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
