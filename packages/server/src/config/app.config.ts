import { registerAs } from '@nestjs/config';
import * as path from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
export default registerAs('app', () => ({
  supabaseUrl: process.env.SUPABASE_URL,
  supabasePublicKey: process.env.SUPABASE_PUBLIC_KEY,
  supabaseJwtSecret: process.env.SUPABASE_JWT_SECRET,
  database: {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: false,
    migrationsTableName: 'migration',
    migrations: [path.join(__dirname, '../database/migrations/*{.ts,.js}')],
    entities: [path.join(__dirname, '../modules/**/*.entity{.ts,.js}')],
    ssl: false,
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
    migrationsTransactionMode: 'each',
  },
}));
