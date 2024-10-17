import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma.service';
import { HashingServiceProtocol } from '../auth2/hashing/hashing.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUserDto } from './dto/filter-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private hashingService: HashingServiceProtocol,
  ) {}

  async create(data: CreateUserDto) {
    const { apartmentIds, condominiumIds, password, ...rest } = data;
    const passwordHash = await this.hashingService.hash(password);

    return this.prisma.user.create({
      data: {
        ...rest,
        password: passwordHash,
        apartments: {
          connect: apartmentIds?.map((id) => ({ id })),
        },
        condominiums: {
          connect: condominiumIds?.map((id) => ({ id })),
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
        apartments: true,
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
        apartments: true,
        condominiums: true,
      },
    });
  }

  async update(id: number, data: UpdateUserDto) {
    const { apartmentIds, condominiumIds, password, ...rest } = data;
    const passwordHash = await this.hashingService.hash(password);

    const currentUser = await this.prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        apartments: true,
        condominiums: true,
      },
    });

    const currentApartmentIds = currentUser.apartments?.map(
      (apartment) => apartment.id,
    );
    const currentCondominiumIds = currentUser.condominiums?.map(
      (condominium) => condominium.id,
    );

    const apartmentsToConnect = apartmentIds?.filter(
      (id) => !currentApartmentIds.includes(id),
    );
    const apartmentsToDisconnect = currentApartmentIds?.filter(
      (id) => !apartmentIds.includes(id),
    );

    const condominiumsToConnect = condominiumIds?.filter(
      (id) => !currentCondominiumIds.includes(id),
    );
    const condominiumsToDisconnect = currentCondominiumIds?.filter(
      (id) => !condominiumIds.includes(id),
    );

    const updatedUser = await this.prisma.user.update({
      where: { id: Number(id) },
      data: {
        ...rest,
        ...(password && { password: passwordHash }),
        apartments: {
          connect: apartmentsToConnect.map((id) => ({ id })),
          disconnect: apartmentsToDisconnect.map((id) => ({ id })),
        },
        condominiums: {
          connect: condominiumsToConnect.map((id) => ({ id })),
          disconnect: condominiumsToDisconnect.map((id) => ({ id })),
        },
      },
      include: {
        apartments: true,
        condominiums: true,
      },
    });

    return updatedUser;
  }

  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
