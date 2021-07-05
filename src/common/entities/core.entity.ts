import { Field, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export class CoreEntity {
  @PrimaryGeneratedColumn()
  @Field((returns) => Number)
  id: number;
  @CreateDateColumn()
  @Field((returns) => Date)
  createAt: Date;
  @UpdateDateColumn()
  @Field((returns) => Date)
  updateAt: Date;
}
