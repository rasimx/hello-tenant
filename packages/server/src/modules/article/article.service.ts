import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { Article } from './article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private readonly repository: Repository<Article>,
  ) {}

  findOne(options: FindOneOptions): Promise<Article> {
    return this.repository.findOne(options);
  }

  async find(
    options: FindManyOptions<Article>,
    tenantId: string,
  ): Promise<Article[]> {
    return this.repository.find({
      ...options,
      where: {
        ...options.where,
        tenantId,
      },
    });
  }
}
