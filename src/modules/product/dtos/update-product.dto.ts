import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { Prisma } from '../../../shared/prisma/generated/client';

export class ProductUpdateDto implements Prisma.UserUpdateInput {

  @ApiProperty()
  @IsString()
  @Length(4, 30)
  email: string;

  // // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  // password!: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  // @Length(4, 30)
  // name?: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsNumber()
  // price?: number;

  // @ApiProperty()
  // @IsString()
  // @IsOptional()
  // @Length(3, 3000)
  // description?: string;
}
