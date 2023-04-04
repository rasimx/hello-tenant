import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import appConfig from './config/app.config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { AuthModule } from './modules/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './modules/user/user.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configAsyncOptions } from './common/helpers/config.helper';
import * as path from 'path';
import { ArticleModule } from './modules/article/article.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: resolve(__dirname, '../.env'),
      load: [appConfig],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),

      // cors: {
      //   origin: true,
      // },
      cache: 'bounded',
    }),
    AuthModule,
    PassportModule,
    UserModule,
    TenantModule,
    ArticleModule,
    TypeOrmModule.forRootAsync(configAsyncOptions('app.database')),
  ],
  providers: [AppService, AppResolver],
  controllers: [AppController],
})
export class AppModule {}
