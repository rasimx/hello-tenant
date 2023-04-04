import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TenantModule } from '../tenant/tenant.module';
import { ArticleService } from './article.service';
import { Article } from './article.entity';
import { ArticleResolver } from './article.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), ConfigModule, TenantModule],
  providers: [ArticleService, ArticleResolver],
  exports: [ArticleService],
})
export class ArticleModule {}
