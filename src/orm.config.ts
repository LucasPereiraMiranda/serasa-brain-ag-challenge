import * as path from 'path';
import { DataSource } from 'typeorm';
import { envConfig } from './env.load';

export const ormConfig = {
  type: 'postgres' as const,
  synchronize: envConfig.db.synchronize,
  migrationsRun: envConfig.db.migrationsRun,
  logging: envConfig.db.logging,
  host: envConfig.db.host,
  port: envConfig.db.port,
  username: envConfig.db.username,
  password: envConfig.db.password,
  autoLoadEntities: envConfig.db.autoLoadEntities,
  database: envConfig.db.database,
  migrations: [path.join(__dirname, '/migrations/*{.ts,.js}')],
  migrationsTableName: 'migrations',
  entities: [path.join(__dirname, '/**/*.entity{.ts,.js}')],
};

const datasource = new DataSource(ormConfig);

datasource
  .initialize()
  .then(() => {
    console.log('Typeorm Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Typeorm Data Source initialization!', err);
  });

export default datasource;