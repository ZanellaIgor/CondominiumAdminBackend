import { HttpStatus } from '@nestjs/common';

export interface IResponse {
  statusCode: HttpStatus;
  message: string;
}
