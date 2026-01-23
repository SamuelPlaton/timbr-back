import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { AuthApi } from './auth.api';
import { UsersApi } from '../users';
import { PasswordResetToken, RefreshToken } from '../../entities';
import { BrevoService } from '../brevo/brevo.service';
import {
  generateEmailVerificationCode,
  verifyEmailVerificationCode,
} from './email-verification.util';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private authApi: AuthApi,
    @Inject(forwardRef(() => UsersApi))
    private userApi: UsersApi,
    private brevoService: BrevoService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  generateAccessToken(userId: string) {
    return this.jwtService.sign({ sub: userId });
  }

  findRefreshToken(filters: object = {}): Promise<RefreshToken> {
    return this.authApi.findRefreshToken(filters);
  }

  async generateRefreshToken(userId: string) {
    const refreshToken = this.jwtService.sign(
      { sub: userId },
      { expiresIn: '7d' },
    );
    const user = await this.userApi.findOneOrFail({ id: userId });
    await this.authApi.saveRefreshToken({
      user: user,
      token: refreshToken,
      created_at: new Date(Date.now()),
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return refreshToken;
  }

  async generatePasswordResetToken(userId: string): Promise<string> {
    const token = crypto.randomBytes(32).toString('hex');
    const user = await this.userApi.findOneOrFail({ id: userId });

    await this.authApi.savePasswordResetToken({
      user: user,
      token: token,
      created_at: new Date(Date.now()),
      expires_at: new Date(Date.now() + 60 * 60 * 1000), // 1 hour expiry
    });

    return token;
  }

  findPasswordResetToken(filters: object = {}): Promise<PasswordResetToken> {
    return this.authApi.findPasswordResetToken(filters);
  }

  async deletePasswordResetToken(id: string): Promise<void> {
    return this.authApi.deletePasswordResetToken(id);
  }

  async sendVerificationEmail(userId: string, email: string): Promise<void> {
    const verificationCode = generateEmailVerificationCode(email, userId);
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?id=${userId}&code=${verificationCode}`;

    await this.brevoService.sendTransactionalEmail(email, 2, {
      VALIDATE_ACCOUNT_LINK: verificationLink,
    });
  }

  async verifyEmail(userId: string, code: string): Promise<boolean> {
    const user = await this.userApi.findOneOrFail({ id: userId });

    if (user.email_verified_at) {
      // Email already verified
      return true;
    }

    const isValid = verifyEmailVerificationCode(user.email, userId, code);

    if (isValid) {
      await this.userApi.update(user, {
        email_verified_at: new Date(),
      });
      return true;
    }

    return false;
  }
}
