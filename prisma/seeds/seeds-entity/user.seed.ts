import { prismaSeed } from '../prisma-seeds';

export async function userSeed() {
  try {
    await prismaSeed.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'adminpassword',
        role: 'ADMIN',
        profilePhoto: 'link-to-photo.jpg',
        apartmentId: 1,
        condominiums: {
          connect: [{ id: 1 }, { id: 2 }],
        },
      },
    });

    await prismaSeed.user.create({
      data: {
        name: 'Regular User',
        email: 'user@example.com',
        password: 'userpassword',
        role: 'USER',
        profilePhoto: 'link-to-photo.jpg',
        apartmentId: 1,
        condominiums: {
          connect: { id: 1 },
        },
      },
    });
    console.log('Usuário criado ou atualizado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar ou atualizar o usuário', error);
  }
}
