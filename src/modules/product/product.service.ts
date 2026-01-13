import { Injectable } from '@nestjs/common';
import { BaseService } from '../../shared/base.service';
import { ProductCreateDto, ProductUpdateDto } from './dtos';
import { UserDelegate } from '../../shared/prisma/generated/models/User';
import { UserResponseDto } from './dtos/user-response.dto';

@Injectable()
export class ProductService extends BaseService<UserResponseDto, UserDelegate, ProductCreateDto, ProductUpdateDto> {
  initModel() {
    this.modelDelegate = this.prisma.user;
  }

  async findAll(): Promise<UserResponseDto[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        createdAt: true
      }
    });
  }
}
