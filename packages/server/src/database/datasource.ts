import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import appConfig from '../config/app.config';

dotenv.config({
  path: '../../.env',
});

export default new DataSource(
  appConfig().database as PostgresConnectionOptions,
);
