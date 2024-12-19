import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSource } from 'typeorm';
dotenv.config();

export const config = {
  type: 'postgres' as const,
  synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE) ?? false,
  migrationsRun: Boolean(process.env.TYPEORM_MIGRATIONS_RUN) ?? false,
  logging: Boolean(process.env.TYPEORM_LOGGING) ?? false,
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  migrations: [path.join(__dirname, '/migrations/*{.ts,.js}')],
  migrationsTableName: 'migrations',
  host: process.env.TYPEORM_HOST ? process.env.TYPEORM_HOST : 'localhost',
  port: Number(process.env.TYPEORM_PORT) ?? 5432,
  username: process.env.TYPEORM_USERNAME ?? 'postgres',
  password: process.env.TYPEORM_PASSWORD ?? 'password',
  database: process.env.TYPEORM_DATABASE ?? 'serasa_brain_ag_challenge',
};

const datasource = new DataSource(config);

datasource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default datasource;
