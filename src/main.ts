import { BadRequestException, ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import { ValidationPipe } from './shared/pipes';

import compression from 'compression';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { join } from 'path';
import favicon from 'serve-favicon';
import { LoggingInterceptor } from './shared/interceptor/logging.interceptor';
import { ResponseInterceptor } from './shared/interceptor/response.interceptor';
import { GlobalExceptionFilter } from './shared/exception/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  });
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('Nestjs Boilerplate')
    .setDescription('This is a project aimed to be a nestjs boilerplate')
    .setVersion('1.1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(new Reflector()));
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new ResponseInterceptor());
  // app.useGlobalGuards(new RolesGuard(new Reflector()));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: errors => {
        return new BadRequestException({
          message: 'Validation failed',
          errors: errors.map(err => ({
            field: err.property,
            errors: Object.values(err.constraints || {})
          }))
        });
      }
    })
  );
  app.use(
    compression(),
    helmet(),
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 10000 // limit each IP to 100 requests per windowMs
    })
    // favicon(join(__dirname, '..', 'public', 'favicon.ico'))
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
