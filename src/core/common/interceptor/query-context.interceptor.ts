import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { REQUEST_TOKEN_PAYLOAD_KEY } from 'src/core/auth/const/auth.constants';
import { CONTEXT_FIELDS_KEY } from '../decorators/context.decorator';

@Injectable()
export class QueryContextInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request[REQUEST_TOKEN_PAYLOAD_KEY];

    if (!user) return next.handle();

    const fieldsToInject = this.reflector.get<string[]>(
      CONTEXT_FIELDS_KEY,
      context.getHandler(),
    );

    if (!fieldsToInject) return next.handle();

    if (fieldsToInject.includes('userId') && !request.query.userId) {
      request.query.userId = Number(user.userId);
    }

    if (
      fieldsToInject.includes('condominiumId') &&
      !request.query.condominiumId
    ) {
      request.query.condominiumId = user.condominiumIds?.[0] || null;
    }

    if (
      fieldsToInject.includes('condominiumIds') &&
      !request.query.condominiumIds
    ) {
      request.query.condominiumIds = user.condominiumIds;
    }

    if (
      fieldsToInject.includes('apartmentIds') &&
      !request.query.apartmentIds
    ) {
      request.query.apartmentIds = user.apartmentIds;
    }

    return next.handle();
  }
}
