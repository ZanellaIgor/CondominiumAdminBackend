import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { FindAllMaintenanceDto } from './dto/filter-reservation.dto';

@Injectable()
export class MaintenanceService {
  constructor(private prisma: PrismaService) {}

  async create(createReserveDto: CreateMaintenanceDto) {
    const { userId, condominiumId, ...data } = createReserveDto;
    return this.prisma.maintenance.create({
      data: {
        ...data,
        condominium: { connect: { id: condominiumId } },
        user: { connect: { id: userId } },
      },
    });
  }

  async findAll(query: FindAllMaintenanceDto) {
    const { page, limit, title, situation } = query;
    const offset = (page - 1) * limit;

    const where = {
      AND: [
        title ? { title: { contains: title } } : {},
        situation ? { situation: situation } : {},
      ],
    };

    const maintenance = await this.prisma.maintenance.findMany({
      skip: offset,
      take: limit,
      where,
      include: {
        condominium: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const totalCount = await this.prisma.maintenance.count({ where });

    return {
      data: maintenance,
      totalCount,
      page,
      limit,
    };
  }

  async findOne(id: number) {
    return this.prisma.maintenance.findUnique({ where: { id } });
  }

  async update(id: number, updateReserveDto: CreateMaintenanceDto) {
    const { userId, condominiumId, ...data } = updateReserveDto;
    return this.prisma.maintenance.update({
      where: { id },
      data: {
        ...data,
        condominium: { connect: { id: condominiumId } },
        user: { connect: { id: userId } },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.maintenance.delete({ where: { id } });
  }
}
