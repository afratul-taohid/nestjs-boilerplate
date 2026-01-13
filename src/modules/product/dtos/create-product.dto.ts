import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { Prisma } from '../../../shared/prisma/generated/client';

export class ProductCreateDto implements Prisma.UserCreateInput {

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
