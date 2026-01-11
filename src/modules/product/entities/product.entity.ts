// import { Exclude, Expose } from 'class-transformer';
// // import { Column, Entity } from 'typeorm';
// // import { BaseEntity } from '../../../shared/base/base.entity';
//
// @Entity('product')
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ProductEntity  {
  // @Column()
  @Expose()
  id?: string;

  @Expose()
  name?: string;

  // @Column()
  @Expose()
  price?: number;

  // @Column()
  @Expose()
  description?: string;
}
