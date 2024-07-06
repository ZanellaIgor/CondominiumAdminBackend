import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infra/prisma.service';
import { CreateWarningDto } from './dto/create-warning.dto';
import { UpdateWarningDto } from './dto/update-warning.dto';

@Injectable()
export class WarningsService {
  constructor(private prisma: PrismaService) {}

  create(createWarningDto: CreateWarningDto) {
    const { userId, condominiumId, ...data } = createWarningDto;
    return this.prisma.warning.create({
      data: {
        ...data,
        condominium: { connect: { id: condominiumId } },
        user: { connect: { id: userId } },
      },
    });
  }

  findAll() {
    return this.prisma.warning.findMany();
  }

  findOne(id: number) {
    return this.prisma.warning.findUnique({ where: { id } });
  }

  update(id: number, updateWarningDto: UpdateWarningDto) {
    const { userId, condominiumId, ...data } = updateWarningDto;
    return this.prisma.warning.update({
      where: { id },
      data: {
        ...data,
        condominium: condominiumId
          ? { connect: { id: condominiumId } }
          : undefined,
        user: userId ? { connect: { id: userId } } : undefined,
      },
    });
  }

  remove(id: number) {
    return this.prisma.warning.delete({ where: { id } });
  }
}
