import 'reflect-metadata';
import { DataSource } from 'typeorm';
import databaseConfig from './config';
import { User, RefreshToken, PasswordResetToken, Onboarding, Chat } from '../entities';

export const AppDataSource = new DataSource({
  ...databaseConfig,
  type: 'postgres',
  entities: [User, RefreshToken, PasswordResetToken, Onboarding, Chat],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  synchronize: false,
  logging: true,
});
