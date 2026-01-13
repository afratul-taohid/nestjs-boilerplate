import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map } from 'rxjs/operators';
import { EXCLUDE_FIELDS_KEY } from '../decorators/exclude-fields.decorator';
import { sanitizeData } from '../utils/sanitize.util';

@Injectable()
export class ResponseSanitizerInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const excludeFields =
      this.reflector.getAllAndOverride<string[]>(EXCLUDE_FIELDS_KEY, [context.getHandler(), context.getClass()]) || [];

    if (excludeFields.length !== 0) {
      return next.handle().pipe(
        map(response => {
          if (!excludeFields.length) {
            return response;
          }

          // BaseResponse
          if (response?.data !== undefined) {
            response.data = sanitizeData(response.data, excludeFields);
            return response;
          }

          // Raw response
          return sanitizeData(response, excludeFields);
        })
      );
    }
    return next.handle();
  }
}
