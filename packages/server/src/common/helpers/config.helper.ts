import { ConfigService } from '@nestjs/config';

export function configAsyncOptions<T = any>(key: string) {
  return {
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => configService.get<T>(key),
    extraProviders: [ConfigService],
  };
}
