// import { PrismaService } from '../prisma/prisma.service';
//
// export abstract class BaseService<T, D> {
//   protected model: D;
//
//   constructor(model: D) {
//     this.model = model;
//   }
//
//   async findAll(): Promise<T[]> {
//     return (this.model as any).findMany({});
//   }
//
//   async findOne(id: string): Promise<T | null> {
//     return (this.model as any).findUnique({ where: { id } });
//   }
//
//   async create(data: any): Promise<T> {
//     return (this.model as any).create({ data });
//   }
// }
