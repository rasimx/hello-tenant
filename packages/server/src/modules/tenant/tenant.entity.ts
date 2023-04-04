import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity({ name: 'tenant' })
@ObjectType()
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (user) => user.tenants)
  users: User[];
}
