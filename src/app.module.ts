import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth';
import { UsersModule } from './modules/users';
import { OnboardingModule } from './modules/onboarding';
import { ChatsModule } from './modules/chats';
import { CompanyModule } from './modules/company';
import { AuditsModule } from './modules/audits';
import { AuditItemsModule } from './modules/audit-items';
import databaseConfig from './database/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...databaseConfig,
      type: 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
      synchronize: false,
      logging: process.env.NODE_ENV === 'development',
    }),
    AuthModule,
    UsersModule,
    OnboardingModule,
    ChatsModule,
    CompanyModule,
    AuditsModule,
    AuditItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
