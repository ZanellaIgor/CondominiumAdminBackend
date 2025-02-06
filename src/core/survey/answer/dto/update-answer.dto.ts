import { PartialType } from '@nestjs/mapped-types';
import { CreateAnswersDto } from './create-answer.dto';

export class UpdateAnswerDto extends PartialType(CreateAnswersDto) {}
