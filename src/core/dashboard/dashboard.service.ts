import { Injectable } from '@nestjs/common';
import { Situation } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma.service';
import { IUserToken } from 'src/utils/interfaces/token.interface';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary(user: IUserToken) {
    const contextUser = {
      ...(!!user.condominiumIds.length && {
        condominiumId: { in: user.condominiumIds },
      }),
    };

    const warningsCount = await this.prisma.warning.count({
      where: {
        situation: Situation.ABERTO,
        ...contextUser,
      },
    });

    const reservationsCount = await this.prisma.reservation.count({
      where: {
        situation: Situation.ABERTO,
        ...contextUser,
      },
    });

    const maintenancesCount = await this.prisma.maintenance.count({
      where: {
        situation: Situation.ABERTO,
        ...contextUser,
      },
    });

    const activeSurveys = await this.prisma.survey.count({
      where: {
        validTo: { gte: new Date() },
        ...contextUser,
      },
    });

    return {
      warnings: warningsCount,
      reservations: reservationsCount,
      maintenances: maintenancesCount,
      survey: activeSurveys,
    };
  }
}
