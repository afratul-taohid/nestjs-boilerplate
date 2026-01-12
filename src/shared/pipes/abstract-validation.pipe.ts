import { ArgumentMetadata, Injectable, Type, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { throwError } from '../validators/validation.helper';

@Injectable()
export class AbstractValidationPipe extends ValidationPipe {
  constructor(
    options: ValidationPipeOptions,
    private readonly targetTypes: { body?: Type; query?: Type; param?: Type }
  ) {
    super(options);
  }

  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    // @ts-ignore
    const targetType = this.targetTypes[metadata.type];
    if (!targetType) {
      return super.transform(value, metadata);
    }
    return super.transform(value, { ...metadata, metatype: targetType }).catch(err => {
      throwError(err, 'Validation failed', 400);
    });
  }
}
