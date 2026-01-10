import 'dotenv/config';

export default {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
  ssl: process.env.NODE_ENV === 'production',
  extra: {
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : undefined,
  },
};
