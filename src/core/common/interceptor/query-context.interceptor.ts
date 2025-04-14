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

interface UserContext {
  userId: number;
  condominiumIds: number[];
  apartmentIds: number[];
  role: Role;
}

interface InjectionRule {
  fieldName: string;
  getValue: (user: UserContext) => any;
  condition?: (user: UserContext) => boolean;
}

@Injectable()
export class QueryContextInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  private injectionRules: InjectionRule[] = [
    // UserId - aplica-se a todos os roles
    {
      fieldName: 'userId',
      getValue: (user) => Number(user.userId),
    },

    // CondominiumId - comportamento diferente por role
    {
      fieldName: 'condominiumId',
      getValue: (user) => Number(user.condominiumIds?.[0] || null),
      condition: (user) => user.role !== Role.MASTER, // Não injeta para MASTER
    },

    // CondominiumIds - apenas para USER e ADMIN
    {
      fieldName: 'condominiumIds',
      getValue: (user) => user.condominiumIds,
      condition: (user) => user.role !== Role.MASTER, // Não injeta para MASTER
    },

    // ApartmentId - comportamento específico por role
    {
      fieldName: 'apartmentId',
      getValue: (user) => {
        if (user.role === Role.USER) {
          return Number(user.apartmentIds?.[0] || null);
        } else if (user.role === Role.ADMIN && user.apartmentIds?.length > 0) {
          return Number(user.apartmentIds[0]);
        }
        return null;
      },
      condition: (user) => {
        // Injetar apenas para USER e para ADMIN (que tenha apartmentIds)
        return (
          user.role === Role.USER ||
          (user.role === Role.ADMIN &&
            Array.isArray(user.apartmentIds) &&
            user.apartmentIds.length > 0)
        );
      },
    },

    // ApartmentIds - apenas para USER e ADMIN (que tenha apartmentIds)
    {
      fieldName: 'apartmentIds',
      getValue: (user) => user.apartmentIds,
      condition: (user) => {
        return (
          user.role === Role.USER ||
          (user.role === Role.ADMIN &&
            Array.isArray(user.apartmentIds) &&
            user.apartmentIds.length > 0)
        );
      },
    },
  ];

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Obter os dados básicos necessários
    const request = context.switchToHttp().getRequest();
    const user = request[REQUEST_TOKEN_PAYLOAD_KEY] as UserContext;

    // Se não houver usuário autenticado, não faz nada
    if (!user) return next.handle();

    // Obter os campos que devem ser injetados (do decorator @Context)
    const fieldsToInject = this.reflector.get<string[]>(
      CONTEXT_FIELDS_KEY,
      context.getHandler(),
    );

    // Se não houver campos para injetar, não faz nada
    if (!fieldsToInject || !fieldsToInject.length) return next.handle();

    // Injetar os campos solicitados
    this.injectFields(fieldsToInject, user, request.query);

    return next.handle();
  }

  /**
   * Injeta campos na query da requisição com base nas regras definidas
   */
  private injectFields(
    fieldsToInject: string[],
    user: UserContext,
    query: any,
  ): void {
    // Para cada campo solicitado no decorator
    for (const fieldName of fieldsToInject) {
      // Encontrar a regra correspondente
      const rule = this.injectionRules.find((r) => r.fieldName === fieldName);

      // Se não houver regra para este campo, pula
      if (!rule) continue;

      // Se o campo já existe na query, não sobrescreve
      if (query[fieldName] !== undefined) continue;

      // Verifica se a condição especial permite injetar (se houver)
      if (rule.condition && !rule.condition(user)) continue;

      // Obtém o valor e injeta na query
      const value = rule.getValue(user);
      if (value !== undefined && value !== null) {
        query[fieldName] = Array.isArray(value)
          ? value.map((v) => (typeof v === 'string' ? Number(v) : v))
          : typeof value === 'string'
            ? Number(value)
            : value;
      }
    }
  }
}
