import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/infra/prisma.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAnswerDto: CreateAnswerDto) {
    return this.prisma.answer.create({
      data: createAnswerDto,
    });
  }

  async findAll() {
    return this.prisma.answer.findMany({
      include: {
        question: true,
      },
    });
  }

  async findOne(id: number) {
    const answer = await this.prisma.answer.findUnique({
      where: { id },
      include: {
        question: true,
      },
    });

    if (!answer) {
      throw new NotFoundException(`Resposta não encontrada.`);
    }

    return answer;
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto) {
    const answer = await this.prisma.answer.findUnique({ where: { id } });

    if (!answer) {
      throw new NotFoundException(`Answer with ID ${id} not found`);
    }

    return this.prisma.answer.update({
      where: { id },
      data: updateAnswerDto,
    });
  }

  async remove(id: number) {
    const answer = await this.prisma.answer.findUnique({ where: { id } });

    if (!answer) {
      throw new NotFoundException(`Resposta não encontrada.`);
    }

    return this.prisma.answer.delete({ where: { id } });
  }
}
