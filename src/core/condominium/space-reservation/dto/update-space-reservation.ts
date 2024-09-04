import { PartialType } from '@nestjs/swagger';
import { CreateSpaceReservationDto } from './create-space-reservation';

export class UpdateSpaceReservationDto extends PartialType(
  CreateSpaceReservationDto,
) {}
