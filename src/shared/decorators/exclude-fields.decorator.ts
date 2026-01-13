import { SetMetadata } from '@nestjs/common';

export const EXCLUDE_FIELDS_KEY = 'exclude_fields';

// tslint:disable-next-line:variable-name
export const ExcludeFields = (...fields: string[]) => SetMetadata(EXCLUDE_FIELDS_KEY, fields);
