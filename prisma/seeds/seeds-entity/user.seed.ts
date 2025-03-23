import { Logger } from '@nestjs/common';
import { Role } from '@prisma/client';
import { BcryptService } from 'src/core/auth/hashing/bcrypt.service';
import { prismaSeed } from '../prisma-seeds';

export async function userSeed() {
  const hashService = new BcryptService();
  const password = await hashService.hash('senhaLOGIN');
  const condominiums = await prismaSeed.condominium.findMany();

  const userSeedMaster = {
    name: `MASTER`,
    email: `master@example.com`,
    password,
    role: Role.MASTER,
  };

  const usersAdminSeed = condominiums.map((condominium) => ({
    name: `Admin ${condominium.name}`,
    email: `admin${condominium.name.toLowerCase().replace(' ', '')}@example.com`,
    password,
    role: Role.ADMIN,
    condominiums: {
      connect: [{ id: condominium.id }],
    },
  }));

  const apartments = await prismaSeed.apartment.findMany();

  const userSeed = apartments.map((apartment) => ({
    name: `User ${apartment.name}`,
    email: `user${apartment.name.toLowerCase().replace(' ', '')}@example.com`,
    password,
    role: Role.USER,
    apartments: {
      connect: [{ id: apartment.id }],
    },
    condominiums: {
      connect: [{ id: apartment.condominiumId }],
    },
  }));

  try {
    await prismaSeed.user.create({
      data: userSeedMaster,
    });
    await prismaSeed.user.createMany({
      data: usersAdminSeed,
    });

    await prismaSeed.user.createMany({
      data: userSeed,
    });

    Logger.log('Usuário criado ou atualizado com sucesso!');
  } catch (error) {
    Logger.error('Erro ao criar ou atualizar o usuário', error);
  }
}
