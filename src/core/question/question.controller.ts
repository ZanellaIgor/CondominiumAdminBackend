import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionService } from './question.service';

@ApiTags('Questões')
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @ApiOperation({ summary: 'Cria uma nova questão' })
  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @ApiOperation({ summary: 'Lista todas as questões' })
  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @ApiOperation({ summary: 'Lista uma questão por ID' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.questionService.findOne(+id);
  }

  @ApiOperation({ summary: 'Edita uma questão por ID' })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(+id, updateQuestionDto);
  }
}
