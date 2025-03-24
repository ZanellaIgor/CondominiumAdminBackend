import { Logger } from '@nestjs/common';
import { Situation } from '@prisma/client';
import { Category } from 'src/utils/enum/category.enum';
import { prismaSeed } from '../prisma-seeds';

export const maintenanceSeed = async () => {
  const maintenanceSeedData = [
    {
      title: 'Elevador Quebrado',
      description: 'Elevador do bloco A não funciona.',
      category: Category.ALTA,
      condominiumId: 1,
      userId: 1,
      situation: Situation.ABERTO,
    },
    {
      title: 'Vazamento na Piscina',
      description: 'Vazamento na piscina principal.',
      category: Category.GRAVE,
      condominiumId: 1,
      userId: 2,
      situation: Situation.ANALISE,
    },
    {
      title: 'Iluminação da Garagem',
      description: 'Lâmpadas queimadas na garagem.',
      category: Category.MEDIA,
      condominiumId: 2,
      userId: 13,
      situation: Situation.ATENDIDO,
    },
    {
      title: 'Portão da Garagem',
      description: 'Portão da garagem com problema no motor.',
      category: Category.ALTA,
      condominiumId: 3,
      userId: 25,
      situation: Situation.REABERTO,
    },
    {
      title: 'Vazamento no Salão de Festas',
      description: 'Vazamento no teto do salão de festas.',
      category: Category.CRITICA,
      condominiumId: 1,
      userId: 3,
      situation: Situation.SUSPENSO,
    },
    {
      title: 'Iluminação da Quadra',
      description: 'Iluminação da quadra esportiva com falhas.',
      category: Category.MEDIA,
      condominiumId: 2,
      userId: 14,
      situation: Situation.ABERTO,
    },
    {
      title: 'Portão Social',
      description: 'Portão social com problema na fechadura.',
      category: Category.ALTA,
      condominiumId: 3,
      userId: 26,
      situation: Situation.ANALISE,
    },
    {
      title: 'Vazamento no Apartamento 202',
      description: 'Vazamento no banheiro do apartamento 202.',
      category: Category.MEDIA,
      condominiumId: 1,
      userId: 5,
      situation: Situation.ATENDIDO,
    },
    {
      title: 'Elevador do Bloco B',
      description: 'Elevador do bloco B com ruídos estranhos.',
      category: Category.GRAVE,
      condominiumId: 1,
      userId: 4,
      situation: Situation.REABERTO,
    },
    {
      title: 'Vazamento na Churrasqueira',
      description: 'Vazamento na área da churrasqueira.',
      category: Category.CRITICA,
      condominiumId: 1,
      userId: 6,
      situation: Situation.SUSPENSO,
    },
    {
      title: 'Iluminação da Piscina',
      description: 'Iluminação da piscina com falhas.',
      category: Category.MEDIA,
      condominiumId: 2,
      userId: 15,
      situation: Situation.ABERTO,
    },
    {
      title: 'Portão da Piscina',
      description: 'Portão da piscina com problema na trava.',
      category: Category.ALTA,
      condominiumId: 3,
      userId: 27,
      situation: Situation.ANALISE,
    },
    {
      title: 'Vazamento no Apartamento 103',
      description: 'Vazamento na cozinha do apartamento 103.',
      category: Category.MEDIA,
      condominiumId: 1,
      userId: 6,
      situation: Situation.ATENDIDO,
    },
    {
      title: 'Elevador do Bloco C',
      description: 'Elevador do bloco C com problema nos botões.',
      category: Category.GRAVE,
      condominiumId: 1,
      userId: 7,
      situation: Situation.REABERTO,
    },
    {
      title: 'Vazamento no Espaço Gourmet',
      description: 'Vazamento no teto do espaço gourmet.',
      category: Category.CRITICA,
      condominiumId: 2,
      userId: 16,
      situation: Situation.SUSPENSO,
    },
    {
      title: 'Iluminação do Espaço Pet',
      description: 'Iluminação do espaço pet com falhas.',
      category: Category.MEDIA,
      condominiumId: 3,
      userId: 28,
      situation: Situation.ABERTO,
    },
    {
      title: 'Portão do Espaço Pet',
      description: 'Portão do espaço pet com problema na trava.',
      category: Category.ALTA,
      condominiumId: 3,
      userId: 29,
      situation: Situation.ANALISE,
    },
    {
      title: 'Vazamento no Apartamento 302',
      description: 'Vazamento na varanda do apartamento 302.',
      category: Category.MEDIA,
      condominiumId: 1,
      userId: 10,
      situation: Situation.ATENDIDO,
    },
    {
      title: 'Elevador do Bloco A',
      description: 'Elevador do bloco A com problema no motor.',
      category: Category.GRAVE,
      condominiumId: 1,
      userId: 11,
      situation: Situation.REABERTO,
    },
    {
      title: 'Vazamento na Sala de Jogos',
      description: 'Vazamento no teto da sala de jogos.',
      category: Category.CRITICA,
      condominiumId: 2,
      userId: 17,
      situation: Situation.SUSPENSO,
    },
  ];

  try {
    await prismaSeed.maintenance.createMany({
      data: maintenanceSeedData,
    });
    Logger.log('Manutenções criadas com sucesso!');
  } catch (error) {
    Logger.error('Manutenções nao criadas', error);
  }
};
