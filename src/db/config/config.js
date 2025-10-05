import 'dotenv/config';

// Super simple: only DATABASE_URL and optional DB_SSL
const useSSL = process.env.DB_SSL === 'true';

const commonConfig = {
  use_env_variable: 'DATABASE_URL',
  dialect: 'postgres',
  dialectOptions: useSSL
    ? { ssl: { require: true, rejectUnauthorized: false } }
    : {},
};

const config = {
  test: {
    username: 'postgres',
    password: null,
    database: 'testdb',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
  },
  development: commonConfig,
  production: commonConfig,
};

export default config;
