import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

import { Tenant } from '../tenant/tenant.entity';

@Entity({ name: 'article' })
@ObjectType()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @ManyToOne(() => Tenant, { cascade: ['insert'] })
  @JoinColumn({ name: 'tenant_id' })
  @Field(() => Tenant, { nullable: true })
  tenant: Tenant;

  @RelationId((article: Article) => article.tenant)
  @Column()
  tenantId: string;

  @Column()
  @Field()
  text: string;
}
