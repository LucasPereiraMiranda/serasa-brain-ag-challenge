import * as dotenv from 'dotenv';
dotenv.config();

interface ConfigProps {
  api: {
    port: number;
    nodeEnv: string;
    host: string;
  };
  db: {
    host: string;
    username: string;
    password: string;
    database: string;
    port: number;
    synchronize: boolean;
    logging: boolean;
    migrationsRun: boolean;
    autoLoadEntities: boolean;
  };
}

const env: any = process.env;

const ensureEnvVar = (name: string, value: any): any => {
  if (value === undefined || value === null || value === '') {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
};

const parseBoolean = (value: string): boolean => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  throw new Error(`Invalid boolean value for: ${value}`);
};

export const envConfig: ConfigProps = {
  api: {
    host: ensureEnvVar('HOST', env.HOST),
    port: ensureEnvVar('PORT', env.PORT),
    nodeEnv: ensureEnvVar('NODE_ENV', env.NODE_ENV),
  },
  db: {
    host: ensureEnvVar('TYPEORM_HOST', env.TYPEORM_HOST),
    username: ensureEnvVar('TYPEORM_USERNAME', env.TYPEORM_USERNAME),
    password: ensureEnvVar('TYPEORM_PASSWORD', env.TYPEORM_PASSWORD),
    database: ensureEnvVar('TYPEORM_DATABASE', env.TYPEORM_DATABASE),
    port: ensureEnvVar('TYPEORM_PORT', env.TYPEORM_PORT),
    synchronize: parseBoolean(
      ensureEnvVar('TYPEORM_SYNCHRONIZE', env.TYPEORM_SYNCHRONIZE),
    ),
    logging: parseBoolean(ensureEnvVar('TYPEORM_LOGGING', env.TYPEORM_LOGGING)),
    migrationsRun: parseBoolean(
      ensureEnvVar('TYPEORM_MIGRATIONS_RUN', env.TYPEORM_MIGRATIONS_RUN),
    ),
    autoLoadEntities: parseBoolean(
      ensureEnvVar(
        'TYPEORM_AUTO_LOAD_ENTITIES',
        env.TYPEORM_AUTO_LOAD_ENTITIES,
      ),
    ),
  },
};
