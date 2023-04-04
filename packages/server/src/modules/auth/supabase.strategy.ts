import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { SupabaseAuthStrategy } from 'nestjs-supabase';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(
  SupabaseAuthStrategy,
  'supabase',
) {
  public constructor(private readonly configService: ConfigService) {
    super({
      supabaseUrl: configService.get('app.supabaseUrl'),
      supabaseKey: configService.get('app.supabasePublicKey'),
      supabaseOptions: {},
      supabaseJwtSecret: configService.get('app.supabaseJwtSecret'),
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any): Promise<any> {
    return super.validate(payload);
  }

  authenticate(req) {
    super.authenticate(req);
  }
}
