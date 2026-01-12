import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { Prisma } from '../../../shared/prisma/generated/client';

export class ProductCreateDto implements Prisma.UserCreateInput {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(4, 30)
  email!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password!: string;
}
