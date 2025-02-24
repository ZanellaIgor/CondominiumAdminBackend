import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Role } from '@prisma/client';

@Injectable()
export class CondominiumAccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const { condominiumId, apartmentId, role } = request.query;

    if (role === Role.MASTER) {
      return true;
    }

    if (!user.condominiums.includes(+condominiumId)) {
      throw new ForbiddenException(
        'Access to this condominium is not allowed.',
      );
    }

    if (apartmentId && !user.apartments.includes(+apartmentId)) {
      throw new ForbiddenException('Access to this apartment is not allowed.');
    }

    return true;
  }
}
