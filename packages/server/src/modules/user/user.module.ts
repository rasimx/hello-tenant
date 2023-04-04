import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TenantModule } from '../tenant/tenant.module';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule, TenantModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
