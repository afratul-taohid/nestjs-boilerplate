import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const statusCode = response.statusCode || HttpStatus.OK;

    return next.handle().pipe(
      map(data => {
        // Allow raw responses (file download, streams, etc.)
        if (data?.skipTransform) {
          return data;
        }
        return {
          status: true,
          statusCode,
          message: data?.message || 'Success',
          data: data?.data ?? data
        };
      })
    );
  }
}
