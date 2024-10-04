import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class AccessValidationService {
  validateCondominiumAccess(
    userCondominiums: number[],
    requestedCondominiumId: number,
  ) {
    if (!userCondominiums.includes(requestedCondominiumId)) {
      throw new ForbiddenException(
        'Access to this condominium is not allowed.',
      );
    }
  }

  validateApartmentAccess(
    userApartments: number[],
    requestedApartmentId: number,
  ) {
    if (!userApartments.includes(requestedApartmentId)) {
      throw new ForbiddenException('Access to this apartment is not allowed.');
    }
  }
}
