import { PartialType } from '@nestjs/mapped-types';
import { CreateApartamentDto } from './create-apartament.dto';

export class UpdateApartamentDto extends PartialType(CreateApartamentDto) {}
