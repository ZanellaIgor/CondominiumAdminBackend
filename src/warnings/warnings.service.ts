import { Injectable } from '@nestjs/common';

import { Prisma, Warning } from '@prisma/client';
import { PrismaService } from '../infra/prisma.service';

@Injectable()
export class WarningsService {
  constructor(private prisma: PrismaService) {}

  async createWarning(data: Prisma.WarningCreateInput): Promise<Warning> {
    return this.prisma.warning.create({
      data,
    });
  }

  async getWarnings(): Promise<Warning[]> {
    return this.prisma.warning.findMany();
  }

  async getWarningById(id: number): Promise<Warning | null> {
    return this.prisma.warning.findUnique({
      where: { id },
    });
  }

  async updateWarning(
    id: number,
    data: Prisma.WarningUpdateInput,
  ): Promise<Warning> {
    return this.prisma.warning.update({
      where: { id },
      data,
    });
  }

  async deleteWarning(id: number): Promise<Warning> {
    return this.prisma.warning.delete({
      where: { id },
    });
  }
}
