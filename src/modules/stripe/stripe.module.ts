import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { Subscription } from '../../entities/subscription.entity';
import { User } from '../../entities/user.entity';
import { BrevoModule } from '../brevo/brevo.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription, User]), BrevoModule],
  controllers: [StripeController],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
