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
export class ContextInterceptor implements NestInterceptor {
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

    if (fieldsToInject.includes('userId') && !request.body.userId) {
      request.body.userId = Number(user.userId);
    }

    if (
      fieldsToInject.includes('condominiumId') &&
      !request.body.condominiumId
    ) {
      request.body.condominiumId = Number(user.condominiumIds?.[0] || null);
    }

    if (
      fieldsToInject.includes('condominiumIds') &&
      !request.body.condominiumIds
    ) {
      request.body.condominiumIds = user.condominiumIds;
    }

    if (fieldsToInject.includes('apartmentIds') && !request.body.apartmentIds) {
      request.body.apartmentIds = user.apartmentIds;
    }

    return next.handle();
  }
}
