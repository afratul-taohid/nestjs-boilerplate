import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../shared/base/base.controller';
import { ProductCreateDto, ProductUpdateDto } from './dtos';
import { ProductService } from './product.service';
import { User } from '../../shared/prisma/generated/client';

@Controller('products')
@ApiTags('products')
export class ProductController extends BaseController<User, ProductCreateDto, ProductUpdateDto>(
  ProductCreateDto,
  ProductUpdateDto
) {
  constructor(private readonly productService: ProductService) {
    super(productService);
  }

  // In case you want to override a method in the basecontroller, this is how
  // you proceed
  @Post()
  async create(@Body() dto: ProductCreateDto): Promise<User> {
    return this.productService.create(dto);
  }
}
