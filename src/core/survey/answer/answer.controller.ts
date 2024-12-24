import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  async createAnswer(@Body() createAnswerDto: CreateAnswerDto) {
    return await this.answerService.createAnswer(createAnswerDto);
  }

  @Get('by-user/:userId')
  async findAnswersByUser(@Param('userId') userId: string) {
    return await this.answerService.findAnswersByUser(+userId);
  }
}
