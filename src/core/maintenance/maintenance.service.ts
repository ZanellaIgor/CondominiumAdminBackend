import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { FindAllMaintenanceDto } from './dto/filter-reservation.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';

@Injectable()
export class MaintenanceService {
  constructor(private prisma: PrismaService) {}

  async create(createReserveDto: CreateMaintenanceDto) {
    const { userId, condominiumId, ...data } = createReserveDto;
    const maintenance = await this.prisma.maintenance.create({
      data: {
        ...data,
        condominium: { connect: { id: condominiumId } },
        user: { connect: { id: userId } },
      },
    });

    if (!maintenance) {
      throw new HttpException(
        'Não foi possível criar a ordem de manutenção',
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Ordem de manutenção criada com sucesso!',
    };
  }

  async findAll(query: FindAllMaintenanceDto) {
    const { page, limit, title, situation, condominiumIds } = query;
    const offset = (page - 1) * limit;

    const where = {
      AND: [
        title ? { title: { contains: title } } : {},
        situation ? { situation: situation } : {},
        condominiumIds ? { condominiumId: { in: condominiumIds } } : {},
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

  async update(id: number, updateReserveDto: UpdateMaintenanceDto) {
    const maintenance = await this.prisma.maintenance.update({
      where: { id },
      data: {
        ...updateReserveDto,
      },
    });

    if (!maintenance) {
      throw new HttpException(
        'Não foi possível editar a ordem de manutenção',
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Ordem de manutenção editada com sucesso!',
    };
  }

  async remove(id: number) {
    return this.prisma.maintenance.delete({ where: { id } });
  }
}
