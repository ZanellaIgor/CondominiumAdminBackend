import { PartialType } from '@nestjs/swagger';
import { CreateCondominiumDto } from './create-condominium';

export class UpdateCondominiumDto extends PartialType(CreateCondominiumDto) {}
