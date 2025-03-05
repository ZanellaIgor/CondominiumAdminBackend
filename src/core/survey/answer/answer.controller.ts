import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthTokenGuard } from 'src/core/auth/guard/auth-token.guard';
import { AnswerService } from './answer.service';
import { CreateAnswersDto } from './dto/create-answer.dto';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  @UseGuards(AuthTokenGuard)
  async createAnswers(
    @Request() req,
    @Body() createAnswersDto: CreateAnswersDto,
  ) {
    const userId = 1;
    return await this.answerService.createAnswers(userId, createAnswersDto);
  }

  @Get('by-user/:userId')
  @UseGuards(AuthTokenGuard)
  async findAnswersByUser(@Param('userId') userId: string) {
    return await this.answerService.findAnswersByUser(+userId);
  }
}
