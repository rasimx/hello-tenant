import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { Tenant } from './tenant.entity';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant) private readonly repository: Repository<Tenant>,
  ) {}

  async find(options: FindManyOptions<Tenant>): Promise<Tenant[]> {
    return this.repository.find(options);
  }
}
