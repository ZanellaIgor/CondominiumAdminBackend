import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';

@Injectable()
export class SurveyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSurveyDto: CreateSurveyDto) {
    const { title, description, condominiumId } = createSurveyDto;
    return this.prisma.survey.create({
      data: {
        title,
        description,
        condominiumId,
      },
    });
  }

  async findAll() {
    return this.prisma.survey.findMany({
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const survey = await this.prisma.survey.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });

    if (!survey) {
      throw new NotFoundException(`Survey with ID ${id} not found`);
    }

    return survey;
  }

  async update(id: number, updateSurveyDto: UpdateSurveyDto) {
    return this.prisma.survey.update({
      where: { id },
      data: updateSurveyDto,
    });
  }
}
