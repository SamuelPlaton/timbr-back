import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { OnboardingModule } from './modules/onboarding/onboarding.module';
import { ChatsModule } from './modules/chats/chats.module';
import { CompanyModule } from './modules/company/company.module';
import { StripeModule } from './modules/stripe/stripe.module';
import { ContactModule } from './modules/contact/contact.module';
import databaseConfig from './database/config';

@Module({
  imports: [
    // SentryModule must be imported first
    SentryModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
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
    StripeModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // SentryGlobalFilter provides automatic exception capturing
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter,
    },
  ],
})
export class AppModule {}
