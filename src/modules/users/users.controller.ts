import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  Put,
  Body,
  ValidationPipe,
  UsePipes,
  BadRequestException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { TokenUsageService } from './token-usage.service';
import { JwtAuthGuard } from '../../guards';
import { AuthService } from '../auth/auth.service';
import { SubscriptionStatus } from '../../entities';
import { getTokenLimit } from '../../config/subscription.config';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenUsageService: TokenUsageService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    const user = await this.usersService.findOneWithRelations(
      { id: req.user.id },
      ['onboarding', 'subscriptions'],
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, subscriptions, ...result } = user;

    // Find the latest active/trialing subscription
    const activeSubscription =
      subscriptions
        ?.filter(
          (s) =>
            s.status === SubscriptionStatus.ACTIVE ||
            s.status === SubscriptionStatus.TRIALING,
        )
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        )[0] ?? null;

    const tier = await this.tokenUsageService.getUserTier(user.id);
    const tokenLimit = getTokenLimit(tier);

    return {
      data: {
        ...result,
        subscription: activeSubscription,
        subscription_tier: tier,
        token_limit: tokenLimit,
      },
    };
  }

  @Put('me')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateProfile(@Request() req, @Body() body: { email?: string }) {
    const user = await this.usersService.findOneOrFail({ id: req.user.id });
    const updatedUser = await this.usersService.update(user, body);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...result } = updatedUser;
    return { data: result };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.findOne({ id });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...result } = user;
    return { data: result };
  }

  @Get(':id/verify/:code')
  async verifyEmail(@Param('id') id: string, @Param('code') code: string) {
    const isVerified = await this.authService.verifyEmail(id, code);

    if (!isVerified) {
      throw new BadRequestException('Code de vérification invalide');
    }

    return {
      message: 'Email vérifié avec succès',
    };
  }
}
