import { Inject, Injectable, Scope } from '@nestjs/common';
import { BaseService } from '../../shared/base/base.service';
import { ProductCreateDto, ProductUpdateDto } from './dtos';
import { PrismaClient, User } from '../../shared/prisma/generated/client';
import { UserDelegate } from '../../shared/prisma/generated/models/User';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { IGetUserAuthInfoRequest } from '../../shared/user-request.interface';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class ProductService extends BaseService<User, UserDelegate, ProductCreateDto, ProductUpdateDto> {
  // constructor(
  //   @Inject() private readonly prisma: PrismaService,
  //   @Inject(REQUEST) protected readonly request: IGetUserAuthInfoRequest
  // ) {
  //   super(request);
  // }

  initModel() {
    this.model = this.prisma.user;
  }
}
