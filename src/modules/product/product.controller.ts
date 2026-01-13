import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../shared/base.controller';
import { ProductCreateDto, ProductUpdateDto } from './dtos';
import { ProductService } from './product.service';
import { User } from '../../shared/prisma/generated/client';
import { isFieldUnique } from '../../shared/utils/validation.helper';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { UserResponseDto } from './dtos/user-response.dto';
import { ExcludeFields } from '../../shared/decorators/exclude-fields.decorator';

@ExcludeFields('password')
@Controller('products')
@ApiTags('products')
export class ProductController extends BaseController<User, ProductCreateDto, ProductUpdateDto>(
  ProductCreateDto,
  ProductUpdateDto
) {
  constructor(private readonly productService: ProductService, private readonly prisma: PrismaService) {
    super(productService);
  }

  // In case you want to override a method in the basecontroller, this is how
  // you proceed
  @Post()
  async create(@Body() dto: ProductCreateDto): Promise<User> {
    await isFieldUnique(this.prisma, 'user', { email: dto.email });
    return this.productService.create(dto);
  }
}
