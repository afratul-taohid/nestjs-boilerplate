import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { throwError } from '../utils/validation.helper';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('No data submitted');
    }
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object, {
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    });
    if (errors.length > 0) {
      throwError(this.buildError(errors), 'Input data validation failed');
    }
    return value;
  }

  private buildError(errors: any) {
    const result = {};
    errors.forEach((el: any) => {
      let prop = el.property;
      let constraints = el;
      // if object to validate has nested objects
      while (constraints.constraints === undefined) {
        prop += constraints.property;
        constraints = constraints.children[0];
      }
      Object.entries(constraints.constraints).forEach(constraint => {
        // @ts-ignore
        result[prop + constraint[0]] = `${constraint[1]}`;
      });
    });
    return result;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }
}
