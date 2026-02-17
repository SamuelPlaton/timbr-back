import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import { User } from '../../entities/user.entity';
import { Subscription } from '../../entities/subscription.entity';
import { SubscriptionStatus } from '../../entities/subscription-status.enum';
import {
  SubscriptionTier,
  getTierFromSubscriptionName,
  getTokenLimit,
} from '../../config/subscription.config';

@Injectable()
export class TokenUsageService {
  private readonly logger = new Logger(TokenUsageService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {}

  async getUserTier(userId: string): Promise<SubscriptionTier> {
    const subscription = await this.subscriptionRepository.findOne({
      where: [
        { user: { id: userId }, status: SubscriptionStatus.ACTIVE },
        { user: { id: userId }, status: SubscriptionStatus.TRIALING },
      ],
      order: { created_at: 'DESC' },
    });

    return getTierFromSubscriptionName(subscription?.name ?? null);
  }

  async checkTokenLimit(user: User): Promise<void> {
    const tier = await this.getUserTier(user.id);
    const limit = getTokenLimit(tier);

    if (user.current_month_token_usage >= limit) {
      throw new ForbiddenException({
        statusCode: 403,
        code: 'TOKEN_LIMIT_EXCEEDED',
        message: 'Vous avez atteint votre limite de tokens pour ce mois.',
        current_usage: user.current_month_token_usage,
        limit,
        tier,
      });
    }
  }

  async incrementTokenUsage(userId: string, tokenCost: number): Promise<void> {
    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({
        current_month_token_usage: () =>
          `current_month_token_usage + ${Math.round(tokenCost)}`,
      })
      .where('id = :id', { id: userId })
      .execute();
  }

  @Cron('0 0 1 * *')
  async resetMonthlyTokenUsage(): Promise<void> {
    this.logger.log('Resetting monthly token usage for all users...');

    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ current_month_token_usage: 0 })
      .execute();

    this.logger.log('Monthly token usage reset complete.');
  }
}
