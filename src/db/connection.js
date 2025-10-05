import { Sequelize } from 'sequelize';
import 'dotenv/config';

const { DATABASE_URL, DB_SSL, NODE_ENV } = process.env;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

const isProduction = NODE_ENV === 'production';
const useSSL = DB_SSL === 'true';

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  logging: !isProduction,
  dialectOptions: useSSL
    ? { ssl: { require: true, rejectUnauthorized: false } }
    : {},
});

export default sequelize;
