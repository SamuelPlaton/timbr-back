import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Stripe from 'stripe';
import { Subscription } from '../../entities/subscription.entity';
import { User } from '../../entities/user.entity';
import { SubscriptionStatus } from '../../entities/subscription-status.enum';

@Injectable()
export class StripeService {
  private readonly logger = new Logger(StripeService.name);
  private stripe: Stripe;

  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-12-15.clover',
    });
  }

  async createCustomer(email: string): Promise<string> {
    const customer = await this.stripe.customers.create({
      email,
    });
    return customer.id;
  }

  async createCheckoutSession(
    customerId: string,
    priceId: string,
    successUrl: string,
    cancelUrl: string,
  ): Promise<string> {
    const session = await this.stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      currency: 'eur',
    });

    return session.url;
  }

  async createPortalSession(
    customerId: string,
    returnUrl: string,
  ): Promise<string> {
    const session = await this.stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    return session.url;
  }

  constructWebhookEvent(
    payload: Buffer,
    signature: string,
  ): Stripe.Event | null {
    try {
      return this.stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (error) {
      this.logger.error(
        `Webhook signature verification failed: ${error.message}`,
      );
      return null;
    }
  }

  async handleSubscriptionCreated(
    subscription: Stripe.Subscription,
  ): Promise<void> {
    this.logger.log(`Handling subscription.created: ${subscription.id}`);

    const customerId = subscription.customer as string;
    const user = await this.userRepository.findOne({
      where: { stripe_customer_id: customerId },
    });

    if (!user) {
      this.logger.error(`User not found for customer ID: ${customerId}`);
      return;
    }

    const priceId = subscription.items.data[0]?.price.id;
    const planName = this.getPlanNameFromPriceId(priceId);

    const newSubscription = this.subscriptionRepository.create({
      name: planName,
      status: subscription.status as SubscriptionStatus,
      stripe_subscription_id: subscription.id,
      user,
    });

    await this.subscriptionRepository.save(newSubscription);
    this.logger.log(`Subscription created for user ${user.id}`);
  }

  async handleSubscriptionUpdated(
    subscription: Stripe.Subscription,
  ): Promise<void> {
    this.logger.log(`Handling subscription.updated: ${subscription.id}`);

    const existingSubscription = await this.subscriptionRepository.findOne({
      where: { stripe_subscription_id: subscription.id },
    });

    if (!existingSubscription) {
      this.logger.error(`Subscription not found: ${subscription.id}`);
      return;
    }

    existingSubscription.status = subscription.status as SubscriptionStatus;
    await this.subscriptionRepository.save(existingSubscription);
    this.logger.log(`Subscription updated: ${subscription.id}`);
  }

  async handleSubscriptionDeleted(
    subscription: Stripe.Subscription,
  ): Promise<void> {
    this.logger.log(`Handling subscription.deleted: ${subscription.id}`);

    const existingSubscription = await this.subscriptionRepository.findOne({
      where: { stripe_subscription_id: subscription.id },
    });

    if (!existingSubscription) {
      this.logger.error(`Subscription not found: ${subscription.id}`);
      return;
    }

    existingSubscription.status = SubscriptionStatus.CANCELED;
    await this.subscriptionRepository.save(existingSubscription);
    this.logger.log(`Subscription canceled: ${subscription.id}`);
  }

  private getPlanNameFromPriceId(priceId: string): string {
    // Map price IDs to plan names
    const priceIdMap = {
      [process.env.STRIPE_OFFER_A_PRICE_ID]: 'Offer A',
      [process.env.STRIPE_OFFER_B_PRICE_ID]: 'Offer B',
      [process.env.STRIPE_OFFER_C_PRICE_ID]: 'Offer C',
    };

    return priceIdMap[priceId] || 'Unknown Plan';
  }
}
