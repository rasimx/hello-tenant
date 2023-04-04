import { Context, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Article } from './article.entity';
import { ArticleService } from './article.service';
import { GqlAuthGuard } from '../auth/gql.guard';

@Resolver()
export class ArticleResolver {
  constructor(private readonly service: ArticleService) {}

  @Query(() => [Article])
  @UseGuards(GqlAuthGuard)
  async articles(@Context() context): Promise<Article[]> {
    const tenantId = context.req.cookies.tenant_id;
    return this.service.find({}, tenantId);
  }
}
