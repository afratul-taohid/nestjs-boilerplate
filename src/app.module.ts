import { MailerModule } from '@nestjs-modules/mailer';
import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrometheusModule, makeCounterProvider, makeGaugeProvider } from '@willsoto/nestjs-prometheus';
import { join } from 'path';
import { localConfig } from './config/config';
// import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
// import { UsersModule } from './modules/users/users.module';
import { LoggingInterceptor } from './shared/interceptor/logging.interceptor';
import { PrismaModule } from './shared/prisma/prisma.module';
// import { LoggerMiddleware } from './shared/middlewares/logger.middleware';

@Module({
  imports: [
    PrometheusModule.register({ path: '/metrics' }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [localConfig]
    }),
    PrismaModule,
    // MailerModule.forRootAsync({
    //   useFactory: () => ({
    //     transport: {
    //       secure: true, // use SSL
    //       auth: {},
    //       template: {
    //         dir: join(__dirname, '..', 'templates'), // from src not dist folder (perhaps needs to change in Prod !!!!!!!)
    //         /* adapter: new HandlebarsAdapter(), // or new PugAdapter */
    //         options: {
    //           strict: true
    //         }
    //       }
    //     }
    //   })
    // }),
    CacheModule.register(),
    // UsersModule,
    // CategoryModule,
    ProductModule
  ],
  controllers: [],
  providers: [
    makeCounterProvider({
      name: 'count',
      help: 'metric_help',
      labelNames: ['method', 'origin'] as string[]
    }),
    makeGaugeProvider({
      name: 'gauge',
      help: 'metric_help'
    }),
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
