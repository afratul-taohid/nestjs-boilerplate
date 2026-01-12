import { CacheModule } from '@nestjs/cache-manager';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { makeCounterProvider, makeGaugeProvider, PrometheusModule } from '@willsoto/nestjs-prometheus';
import { localConfig } from './config/config';
import { ProductModule } from './modules/product/product.module';
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
    })
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
