import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

import { User } from './user.entity';
import { SupabaseAuthUser } from 'nestjs-supabase';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  findOne(options: FindOneOptions): Promise<User> {
    return this.repository.findOne(options);
  }

  async findOrCreate(
    supabaseUser: SupabaseAuthUser,
    relations = [],
  ): Promise<User> {
    relations = [...new Set(relations)];
    let user = await this.findOne({
      relations,
      where: { id: supabaseUser.id },
    });

    if (!user) {
      user = await this.repository.save({
        id: supabaseUser.id,
        email: supabaseUser.email,
      });
    }
    return Promise.resolve(user);
  }
}
