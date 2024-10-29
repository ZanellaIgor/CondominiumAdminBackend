import { PartialType } from '@nestjs/swagger';
import { CreateApartamentDto } from './create-apartament.dto';

export class UpdateApartamentDto extends PartialType(CreateApartamentDto) {}
