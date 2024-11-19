import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAnswerDto {
  @ApiProperty({ description: 'Text of the answer', example: 'Red' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    description: 'ID of the question to which the answer belongs',
    example: 1,
  })
  @IsNotEmpty()
  questionId: number;
}
