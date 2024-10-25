import { BcryptService } from 'src/core/auth2/hashing/bcrypt.service';
import { prismaSeed } from '../prisma-seeds';

export async function userSeed() {
  const hashService = new BcryptService();
  const password = await hashService.hash('senhaLOGIN');
  try {
    await prismaSeed.user.create({
      data: {
        name: 'MASTER',
        email: 'master@example.com',
        password,
        role: 'MASTER',
        profilePhoto: 'link-to-photo.jpg',
        condominiums: {
          connect: [{ id: 1 }, { id: 2 }],
        },
      },
    });

    await prismaSeed.user.create({
      data: {
        name: 'ADMIN',
        email: 'admin@example.com',
        password,
        role: 'ADMIN',
        profilePhoto: 'link-to-photo.jpg',
        apartments: {
          connect: [{ id: 1 }],
        },
        condominiums: {
          connect: [{ id: 1 }],
        },
      },
    });

    await prismaSeed.user.create({
      data: {
        name: 'User',
        email: 'user@example.com',
        password,
        role: 'USER',
        profilePhoto: 'link-to-photo.jpg',
        apartments: {
          connect: [{ id: 1 }],
        },
        condominiums: {
          connect: [{ id: 1 }],
        },
      },
    });

    console.log('Usuário criado ou atualizado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar ou atualizar o usuário', error);
  }
}
