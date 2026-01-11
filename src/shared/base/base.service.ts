import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { IGetUserAuthInfoRequest } from '../user-request.interface';
import { BaseCreateDto } from './dtos/create-base.dto';
import { BaseUpdateDto } from './dtos/update-base.dto';
import { IBaseService } from './interfaces/base-service.interface';
import { PrismaService } from '../prisma/prisma.service';

// type PrismaModelDelegate<T> = {
//   findMany(args?: any): Promise<T[]>;
//   findUnique(args: any): Promise<T | null>;
//   create(args: { data: any }): Promise<T>;
//   update(args: { where: any; data: any }): Promise<T>;
//   delete(args: { where: any }): Promise<void>;
//   deleteMany(args?: any): Promise<void>;
// };

@Injectable({ scope: Scope.REQUEST })
export abstract class BaseService<
  T,
  D,
  createDto extends BaseCreateDto,
  updateDto extends BaseUpdateDto
> implements IBaseService<T, createDto, updateDto>
{
  constructor(
    @Inject() protected readonly prisma: PrismaService,
    @Inject(REQUEST) protected readonly request: IGetUserAuthInfoRequest
  ) {
    this.initModel();
  }

  protected model: D | undefined;

  abstract initModel(): void;
  async findAll(): Promise<T[]> {
    return (this.model as any).findMany();
  }

  async findOne(id: string): Promise<T> {
    return (this.model as any).findUnique({ where: { id } });
  }

  /**
   *
   * @param dto : BaseCreateDto CreateDTO of the submitted entity
   * @returns : The created entity
   */
  async create(dto: createDto): Promise<T> {
    const data: any = { ...dto };
    if (this.request.user) {
      if ('createdById' in data) data.createdById = this.request.user.id;
      if ('updatedById' in data) data.updatedById = this.request.user.id;
    }

    console.log(data)

    return (this.model as any).create({ data });
  }
  /**
   *
   * @param id : string ID of the entity
   * @param dto : BaseUpdateDto DTO to be assigned for the entity
   * @returns : The modified entity
   */
  async update(id: string, dto: updateDto): Promise<T> {
    const data: any = { ...dto };

    if (this.request.user) {
      if ('updatedById' in data) data.updatedById = this.request.user.id;
    }
    return (this.model as any).update({
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
  async updateStatus(id: string, archived: boolean): Promise<T> {
    const data: any = { isDeleted: archived };

    if (this.request.user) {
      data.updatedById = this.request.user.id;
    }

    return (this.model as any).update({
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
    await (this.model as any).delete({ where: { id } });
  }

  async clear(): Promise<void> {
    await (this.model as any).deleteMany({});
  }

  // async search(query: any): Promise<T[]> {
  //   return this.prisma[this.model].findMany(query) as unknown as T[];
  // }
}
