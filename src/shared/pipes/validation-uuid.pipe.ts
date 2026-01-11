import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { validate as isUUID } from 'uuid';

@Injectable()
export class ValidateUUIDPipe implements PipeTransform<string> {
  transform(value: string) {
    if (!isUUID(value)) throw new BadRequestException('Invalid UUID');
    return value;
  }
}
