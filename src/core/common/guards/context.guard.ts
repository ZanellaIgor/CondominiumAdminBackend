import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { REQUEST_TOKEN_PAYLOAD_KEY } from 'src/core/auth/const/auth.constants';

enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MASTER = 'MASTER',
}

@Injectable()
export class ContextGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request[REQUEST_TOKEN_PAYLOAD_KEY];

    if (!user) return false;

    // Se for MASTER, permitir acesso total
    if (user.role === UserRole.MASTER) {
      return true;
    }

    // Para USER e ADMIN, validar de acordo com as permissões
    this.validateBodyInContext(request, user);
    this.validateQueryInContext(request, user);

    return true;
  }

  private validateBodyInContext(request: any, user: any) {
    // Validação de userId para todos os tipos
    this.validateInContext(request.body.userId, user.userId, 'User');

    if (user.role === UserRole.USER) {
      // USER: Validar condomínio e apartamento
      this.validateInContext(
        request.body.condominiumId,
        user.condominiumIds,
        'Condominium',
      );
      this.validateInContext(
        request.body.apartmentId,
        user.apartmentIds,
        'Apartment',
      );
      this.validateArrayInContext(
        request.body.apartmentIds,
        user.apartmentIds,
        'Apartment',
      );
    } else if (user.role === UserRole.ADMIN) {
      // ADMIN: Validar apenas condomínio
      this.validateInContext(
        request.body.condominiumId,
        user.condominiumIds,
        'Condominium',
      );
      this.validateArrayInContext(
        request.body.condominiumIds,
        user.condominiumIds,
        'Condominium',
      );
      // ADMIN tem acesso a todos os apartamentos dos condomínios permitidos
      // Portanto, não validamos apartmentIds para ADMIN
    }
  }

  private validateQueryInContext(request: any, user: any) {
    // Lógica similar à validateBodyInContext
    this.validateInContext(request.query.userId, user.userId, 'User');

    if (user.role === UserRole.USER) {
      this.validateInContext(
        request.query.condominiumId,
        user.condominiumIds,
        'Condominium',
      );
      this.validateInContext(
        request.query.apartmentId,
        user.apartmentIds,
        'Apartment',
      );
    } else if (user.role === UserRole.ADMIN) {
      this.validateInContext(
        request.query.condominiumId,
        user.condominiumIds,
        'Condominium',
      );
    }
  }

  // Manter os métodos de validação originais
  private validateInContext(
    value: number | string,
    allowedValues: number[],
    field: string,
  ) {
    // Método original
    if (!value) return;
    const numericValue = Number(value);
    if (typeof allowedValues === 'number') {
      if (numericValue !== allowedValues) {
        throw new ForbiddenException(
          `${field} ID is not within allowed context.`,
        );
      }
    } else if (Array.isArray(allowedValues)) {
      if (!allowedValues.includes(numericValue)) {
        throw new ForbiddenException(
          `${field} ID is not within allowed context.`,
        );
      }
    }
  }

  private validateArrayInContext(
    values: number[],
    allowedValues: number[],
    field: string,
  ) {
    // Método original
    if (
      values &&
      values.length > 0 &&
      !values?.every((id) => allowedValues.includes(id))
    ) {
      throw new ForbiddenException(
        `${field} IDs are not within allowed context.`,
      );
    }
  }
}
