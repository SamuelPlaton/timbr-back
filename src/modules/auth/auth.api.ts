import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordResetToken, RefreshToken } from '../../entities';
import { QueryBuilder } from '../utils';

@Injectable()
export class AuthApi {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly repository: Repository<RefreshToken>,
    @InjectRepository(PasswordResetToken)
    private readonly passwordResetTokenRepository: Repository<PasswordResetToken>,
  ) {}

  public async findRefreshToken(filters: object = {}): Promise<RefreshToken> {
    return new QueryBuilder<RefreshToken>(this.repository, 'refresh_token')
      .withFilters(filters)
      .findOne();
  }

  public async saveRefreshToken(
    params: Partial<RefreshToken>,
  ): Promise<RefreshToken> {
    const token = this.repository.create(params);
    return await this.repository.save(token);
  }

  public async findPasswordResetToken(
    filters: object = {},
  ): Promise<PasswordResetToken> {
    return new QueryBuilder<PasswordResetToken>(
      this.passwordResetTokenRepository,
      'password_reset_token',
    )
      .withRelations(['user'])
      .withFilters(filters)
      .findOne();
  }

  public async savePasswordResetToken(
    params: Partial<PasswordResetToken>,
  ): Promise<PasswordResetToken> {
    const token = this.passwordResetTokenRepository.create(params);
    return await this.passwordResetTokenRepository.save(token);
  }

  public async deletePasswordResetToken(id: string): Promise<void> {
    await this.passwordResetTokenRepository.delete(id);
  }
}
