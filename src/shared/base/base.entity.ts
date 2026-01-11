// import { ApiProperty } from '@nestjs/swagger';
// import { Expose, Transform } from 'class-transformer';
// import { IUser } from '../../modules/users/interface/user.interface';
//
// export abstract class BaseEntity {
//   @ApiProperty()
//   @Expose()
//   public id: string;
//
//   @Column()
//   @Expose()
//   public isDeleted: boolean;
//
//   @Column()
//   @Transform(transformEntity)
//   public userCreated: ObjectId | IUser;
//
//   @Column()
//   @Expose()
//   protected createdAt: Date;
//
//   @Column()
//   @Transform(transformEntity)
//   public userUpdated: ObjectId | IUser;
//
//   @Column()
//   @Expose()
//   protected lastUpdateAt: Date;
// }
