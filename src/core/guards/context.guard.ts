import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUEST_TOKEN_PAYLOAD_KEY } from '../auth/const/auth.constants';

@Injectable()
export class ContextGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request[REQUEST_TOKEN_PAYLOAD_KEY];

    const requiredContext = this.reflector.getAllAndOverride<string[]>(
      'context',
      [context.getHandler(), context.getClass()],
    );

    if (requiredContext) {
      if (requiredContext.includes('userId') && !request.body.userId) {
        request.body.userId = Number(user.userId);
      }

      if (requiredContext.includes('condominiumIds')) {
        if (!request.body.condominiumIds) {
          request.body.condominiumIds = user.condominiumIds;
        } else {
          this.validateArrayWithinContext(
            request.body.condominiumIds,
            user.condominiumIds,
            'Condominium',
          );
        }
      }

      if (requiredContext.includes('condominiumId')) {
        if (!request.body.condominiumId) {
          request.body.condominiumId = Number(user.condominiumIds[0]);
        } else {
          this.validateValueWithinContext(
            Number(request.body.condominiumId),
            user.condominiumIds,
            'Condominium',
          );
        }
      }

      if (requiredContext.includes('apartmentIds')) {
        if (!request.body.apartmentIds) {
          request.body.apartmentIds = user.apartmentIds;
        } else {
          this.validateArrayWithinContext(
            request.body.apartmentIds,
            user.apartmentIds,
            'Apartment',
          );
        }
      }
    }

    return true;
  }

  private validateArrayWithinContext(
    requestedArray: number[],
    contextArray: number[],
    field: string,
  ) {
    const isValid = requestedArray.every((id) => contextArray.includes(id));
    if (!isValid) {
      throw new ForbiddenException(
        `${field} IDs are not within allowed context.`,
      );
    }
  }

  private validateValueWithinContext(
    requestedValue: number,
    contextArray: number[],
    field: string,
  ) {
    if (!contextArray.includes(requestedValue)) {
      throw new ForbiddenException(
        `${field} ID is not within allowed context.`,
      );
    }
  }
}
