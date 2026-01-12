import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL as string });
    super({ adapter });
  }

  // constructor() {
  //   super();
  //
  //   // ✅ Register middleware here
  //   this.$use(async (params: any, next: any) => {
  //     if (params.model && ['User'].includes(params.model)) {
  //       // Auto set createdById / updatedById
  //       if (params.action === 'create') {
  //         if (!params.args.data.createdById && params.args.userId) {
  //           params.args.data.createdById = params.args.userId;
  //         }
  //         if (!params.args.data.updatedById && params.args.userId) {
  //           params.args.data.updatedById = params.args.userId;
  //         }
  //       }
  //       if (params.action === 'update') {
  //         if (params.args.userId) {
  //           params.args.data.updatedById = params.args.userId;
  //         }
  //       }
  //     }
  //     return next(params);
  //   });
  // }

  // async onModuleInit() {
  //   await this.$connect();
  // }
  //
  // async onModuleDestroy() {
  //   this.$disconnect();
  // }

  // async enableShutdownHooks() {
  //   this.$on('beforeExit', async () => {
  //     await this.$disconnect();
  //   });
  // }
}
