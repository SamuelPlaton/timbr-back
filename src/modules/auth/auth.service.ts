import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { AuthApi } from './auth.api';
import { UsersApi } from '../users';
import { PasswordResetToken, RefreshToken } from '../../entities';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private authApi: AuthApi,
    @Inject(forwardRef(() => UsersApi))
    private userApi: UsersApi,
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
}
