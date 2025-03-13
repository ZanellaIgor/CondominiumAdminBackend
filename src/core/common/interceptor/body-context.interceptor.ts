import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { Observable } from 'rxjs';
import { REQUEST_TOKEN_PAYLOAD_KEY } from 'src/core/auth/const/auth.constants';
import { CONTEXT_FIELDS_KEY } from '../decorators/context.decorator';

interface InjectionRule {
  fieldName: string;
  getValue: (user: any) => any;
  condition?: (user: any) => boolean;
}

@Injectable()
export class BodyContextInterceptor implements NestInterceptor {
  private injectionRules: InjectionRule[] = [
    {
      fieldName: 'userId',
      getValue: (user) => Number(user.userId),
    },
    {
      fieldName: 'condominiumId',
      getValue: (user) => Number(user.condominiumIds?.[0] || null),
    },
    {
      fieldName: 'condominiumIds',
      getValue: (user) => user.condominiumIds,
    },
    {
      fieldName: 'apartmentIds',
      getValue: (user) => user.apartmentIds,
      condition: (user) => 
        (user.role === Role.MASTER || user.role === Role.ADMIN) &&
        Array.isArray(user.apartmentIds) &&
        user.apartmentIds.length > 0
    },
    {
      fieldName: 'apartmentId',
      getValue: (user) => user.apartmentIds[0],
      condition: (user) => 
        (user.role === Role.MASTER || user.role === Role.ADMIN) &&
        Array.isArray(user.apartmentIds) &&
        user.apartmentIds.length > 0
    }
  ];

  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request[REQUEST_TOKEN_PAYLOAD_KEY];

    if (!user) return next.handle();

    const fieldsToInject = this.reflector.get<string[]>(
      CONTEXT_FIELDS_KEY,
      context.getHandler(),
    );

    if (!fieldsToInject || !fieldsToInject.length) return next.handle();

    this.injectFields(fieldsToInject, user, request.body);

    return next.handle();
  }

  private injectFields(fieldsToInject: string[], user: any, body: any): void {
    for (const field of fieldsToInject) {
      const rule = this.injectionRules.find(r => r.fieldName === field);
      
      if (!rule) continue;
      
      // Verifica se o campo já existe no body
      if (body[field] !== undefined) continue;
      
      // Verifica se há uma condição especial para injetar o campo
      if (rule.condition && !rule.condition(user)) continue;
      
      // Injeta o valor no body
      const value = rule.getValue(user);
      if (value !== undefined) {
        body[field] = value;
      }
    }
  }
}