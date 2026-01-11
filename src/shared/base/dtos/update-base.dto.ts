import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseUpdateDto {
  @ApiProperty()
  private id?: string;
}
