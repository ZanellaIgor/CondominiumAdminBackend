import { Injectable } from '@nestjs/common';
import { Situation } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary() {
    const warningsCount = await this.prisma.warning.count({
      where: { situation: Situation.ABERTO },
    });
    const reservationsCount = await this.prisma.reservation.count({
      where: { situation: Situation.ABERTO },
    });
    const maintenancesCount = await this.prisma.maintenance.count({
      where: { situation: Situation.ABERTO },
    });

    return {
      warnings: warningsCount,
      reservations: reservationsCount,
      maintenances: maintenancesCount,
    };
  }
}
