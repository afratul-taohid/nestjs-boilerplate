import { Inject, Injectable, Scope } from '@nestjs/common';
import { BaseService } from '../../shared/base.service';
import { ProductCreateDto, ProductUpdateDto } from './dtos';
import { User } from '../../shared/prisma/generated/client';
import { UserDelegate } from '../../shared/prisma/generated/models/User';

@Injectable()
export class ProductService extends BaseService<User, UserDelegate, ProductCreateDto, ProductUpdateDto> {

  initModel() {
    this.modelDelegate = this.prisma.user;
  }
}
