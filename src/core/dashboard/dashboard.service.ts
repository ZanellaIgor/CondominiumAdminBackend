import { Injectable } from '@nestjs/common';
import { Situation } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma.service';
import { IUserToken } from 'src/utils/interfaces/token.interface';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary(user: IUserToken) {
    const warningsCount = await this.prisma.warning.count({
      where: {
        situation: Situation.ABERTO,
        ...(user.condominiumIds && {
          condominiumId: { in: user.condominiumIds },
        }),
        ...(user.apartmentIds && { apartmentId: { in: user.apartmentIds } }),
      },
    });

    const reservationsCount = await this.prisma.reservation.count({
      where: {
        situation: Situation.ABERTO,
        ...(user.condominiumIds && {
          condominiumId: { in: user.condominiumIds },
        }),
        ...(user.apartmentIds && { apartmentId: { in: user.apartmentIds } }),
      },
    });

    const maintenancesCount = await this.prisma.maintenance.count({
      where: {
        situation: Situation.ABERTO,
        ...(user.condominiumIds && {
          condominiumId: { in: user.condominiumIds },
        }),
        ...(user.apartmentIds && { apartmentId: { in: user.apartmentIds } }),
      },
    });

    const activeSurveys = await this.prisma.survey.count({
      where: {
        validTo: { gte: new Date() },
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
