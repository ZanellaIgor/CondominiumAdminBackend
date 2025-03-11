import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { REQUEST_TOKEN_PAYLOAD_KEY } from 'src/core/auth/const/auth.constants';

@Injectable()
export class ContextGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request[REQUEST_TOKEN_PAYLOAD_KEY];

    if (!user) return false;

    this.validateBodyInContext(request, user);
    this.validateQueryInContext(request, user);

    return true;
  }

  private validateBodyInContext(request: any, user: any) {
    this.validateInContext(request.body.userId, user.userId, 'User');

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

    this.validateArrayInContext(
      request.body.apartmentIds,
      user.apartmentIds,
      'Apartment',
    );

    this.validateArrayInContext(
      request.body.apartmentId,
      user.apartmentIds,
      'Apartment',
    );
  }

  private validateQueryInContext(request: any, user: any) {
    this.validateInContext(request.query.userId, user.userId, 'User');
    this.validateInContext(
      request.query.condominiumId,
      user.condominiumIds,
      'Condominium',
    );
    this.validateArrayInContext(
      request.query.condominiumIds,
      user.condominiumIds,
      'Condominium',
    );
    this.validateArrayInContext(
      request.query.apartmentIds,
      user.apartmentIds,
      'Apartment',
    );
  }

  private validateInContext(
    value: number | string,
    allowedValues: number[],
    field: string,
  ) {
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
    if (values && !values.every((id) => allowedValues.includes(id))) {
      throw new ForbiddenException(
        `${field} IDs are not within allowed context.`,
      );
    }
  }
}
