import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Tenant } from '../tenant/tenant.entity';

@Entity({ name: 'user' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @ManyToMany(() => Tenant, (tenant) => tenant.users, {
    cascade: true,
  })
  @JoinTable()
  @Field(() => [Tenant], { nullable: true })
  tenants: Tenant[];

  @Column()
  @Field()
  email: string;
}
