import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users';
import { JwtStrategy } from './jwt.strategy';
import { AuthApi } from './auth.api';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordResetToken, RefreshToken } from '../../entities';
import { BrevoModule } from '../brevo/brevo.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshToken, PasswordResetToken]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
      inject: [ConfigService],
    }),
    forwardRef(() => UsersModule),
    BrevoModule,
  ],
  exports: [AuthApi, AuthService, JwtStrategy],
  providers: [AuthApi, AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
