import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { IGetUserAuthInfoRequest } from '../user-request.interface';
import { IBaseService } from './interfaces/base-service.interface';
import { PrismaService } from '../prisma/prisma.service';

@Injectable({ scope: Scope.REQUEST })
export abstract class BaseService<Model, ModelDelegate, CreateDTO, UpdateDTO> implements IBaseService<Model, CreateDTO, UpdateDTO> {
  constructor(
    @Inject() protected readonly prisma: PrismaService,
    @Inject(REQUEST) protected readonly request: IGetUserAuthInfoRequest
  ) {
    this.initModel();
  }

  protected modelDelegate: ModelDelegate | undefined;

  abstract initModel(): void;
  async findAll(): Promise<Model[]> {
    return (this.modelDelegate as any).findMany();
  }

  async findOne(id: string): Promise<Model> {
    return (this.modelDelegate as any).findUnique({ where: { id } });
  }

  /**
   *
   * @param dto : BaseCreateDto CreateDTO of the submitted entity
   * @returns : The created entity
   */
  async create(dto: CreateDTO): Promise<Model> {
    const data: any = { ...dto };
    if (this.request.user) {
      if ('createdById' in data) data.createdById = this.request.user.id;
      if ('updatedById' in data) data.updatedById = this.request.user.id;
    }
    return (this.modelDelegate as any).create({ data });
  }
  /**
   *
   * @param id : string ID of the entity
   * @param dto : BaseUpdateDto DTO to be assigned for the entity
   * @returns : The modified entity
   */
  async update(id: string, dto: UpdateDTO): Promise<Model> {
    const data: any = { ...dto };

    if (this.request.user) {
      if ('updatedById' in data) data.updatedById = this.request.user.id;
    }
    return (this.modelDelegate as any).update({
      where: { id },
      data
    });
  }
  /**
   *
   * @param id : string of the given entity
   * @param archived : boolean status of archive
   * This method applies logical deletion or restoration from the database by setting the isDeleted to true or false
   */
  async updateStatus(id: string, archived: boolean): Promise<Model> {
    const data: any = { isDeleted: archived };

    if (this.request.user) {
      data.updatedById = this.request.user.id;
    }

    return (this.modelDelegate as any).update({
      where: { id },
      data: { ...data }
    });
  }

  /**
   *
   * @param id : string of the given entity
   * This method applies logical deletion or restoration from the database by setting the isDeleted to true or false
   */
  async delete(id: string): Promise<void> {
    await (this.modelDelegate as any).delete({ where: { id } });
  }

  async clear(): Promise<void> {
    await (this.modelDelegate as any).deleteMany({});
  }

  // async search(query: any): Promise<T[]> {
  //   return this.prisma[this.model].findMany(query) as unknown as T[];
  // }
}
