import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthTokenGuard } from 'src/core/auth/guard/auth-token.guard';
import { IResponse } from 'src/utils/interfaces/response.interface';
import { AnswerService } from './answer.service';
import { CreateAnswersDto } from './dto/create-answer.dto';

@ApiTags('Respostas')
@Controller('answers')
@ApiResponse({ status: 401, description: 'Usuário não autenticado.' })
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  @UseGuards(AuthTokenGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Cria respostas para uma enquete' })
  @ApiResponse({
    status: 201,
    description: 'Respostas criadas com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Não foi possível criar as respostas.',
  })
  async createAnswers(
    @Body() createAnswersDto: CreateAnswersDto,
  ): Promise<IResponse> {
    const userId = 1;
    return await this.answerService.createAnswers(userId, createAnswersDto);
  }

  @Get('by-user/:userId')
  @UseGuards(AuthTokenGuard)
  @ApiOperation({ summary: 'Busca respostas por ID de usuário' })
  @ApiResponse({
    status: 200,
    description: 'Lista de respostas retornada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhuma resposta encontrada para o usuário.',
  })
  async findAnswersByUser(@Param('userId', ParseIntPipe) userId: number) {
    return await this.answerService.findAnswersByUser(userId);
  }
}
