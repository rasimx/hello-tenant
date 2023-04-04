import { AppService } from './app.service';
import { Context, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from './modules/auth/gql.guard';
import { UseGuards } from '@nestjs/common';
import { SupabaseAuthUser } from 'nestjs-supabase';
import { CurrentUser } from './modules/auth/current-user';
import { UserService } from './modules/user/user.service';
import { Tenant } from './modules/tenant/tenant.entity';

@Resolver()
export class AppResolver {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [Tenant])
  @UseGuards(GqlAuthGuard)
  async tenants(
    @CurrentUser() supabaseUser: SupabaseAuthUser,
    @Context() context,
  ): Promise<Tenant[]> {
    const user = await this.userService.findOrCreate(supabaseUser, ['tenants']);
    return user.tenants;
  }
}
