import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswersDto } from './dto/create-answer.dto';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  async createAnswers(
    @Request() req,
    @Body() createAnswersDto: CreateAnswersDto,
  ) {
    const userId = 1;
    return await this.answerService.createAnswers(userId, createAnswersDto);
  }

  @Get('by-user/:userId')
  async findAnswersByUser(@Param('userId') userId: string) {
    return await this.answerService.findAnswersByUser(+userId);
  }
}
