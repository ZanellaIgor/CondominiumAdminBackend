import { SetMetadata } from '@nestjs/common';

export const CONTEXT_FIELDS_KEY = 'contextFields';

export const InjectContext = (...fields: string[]) =>
  SetMetadata(CONTEXT_FIELDS_KEY, fields);
