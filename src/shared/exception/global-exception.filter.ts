import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '../prisma/generated/client';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = 500;
    let message = 'Internal server error';
    let errors: string[] = [];

    /**
     * ✅ Prisma Known Errors
     */
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002': // Unique constraint
          status = 409;
          message = 'Duplicate value';
          // @ts-ignore
          errors = [`Already Exists`];
          break;

        case 'P2025': // Record not found
          status = 404;
          message = 'Record not found';
          break;

        default:
          status = 400;
          message = 'Database error';
      }
    } else if (exception instanceof HttpException) {

    /**
     * ✅ NestJS HTTP Exceptions
     */
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else {
        message = (res as any).message || message;
        errors = (res as any).errors || [];
      }
    } else if (exception instanceof Error) {

    /**
     * ✅ Fallback (Unknown Errors)
     */
      message = exception.message;
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      // path: request.url,
      // timestamp: new Date().toISOString(),
      message,
      errors
    });

    // tslint:disable-next-line:no-console
    console.log(exception)
  }
}
