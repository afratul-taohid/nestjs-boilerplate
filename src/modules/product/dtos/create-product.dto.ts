import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { BaseCreateDto } from '../../../shared/base/dtos/create-base.dto';

export class ProductCreateDto extends BaseCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(4, 30)
  email?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password?: string;

  // @ApiProperty()
  // @IsString()
  // @IsOptional()
  // @Length(3, 3000)
  // description?: string;
}
