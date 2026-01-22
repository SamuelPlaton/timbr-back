import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  BadRequestException,
  Headers,
  RawBodyRequest,
  Req,
  HttpCode,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { JwtAuthGuard } from '../../guards';
import { BrevoService } from '../brevo/brevo.service';
import Stripe from 'stripe';

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly brevoService: BrevoService,
  ) {}

  @Post('create-checkout-session')
  @UseGuards(JwtAuthGuard)
  async createCheckoutSession(
    @Request() req,
    @Body('priceId') priceId: string,
    @Body('successUrl') successUrl: string,
    @Body('cancelUrl') cancelUrl: string,
  ) {
    const user = req.user;

    if (!user.stripe_customer_id) {
      throw new BadRequestException('User does not have a Stripe customer ID');
    }

    const url = await this.stripeService.createCheckoutSession(
      user.stripe_customer_id,
      priceId,
      successUrl,
      cancelUrl,
    );

    return { url };
  }

  @Post('create-portal-session')
  @UseGuards(JwtAuthGuard)
  async createPortalSession(
    @Request() req,
    @Body('returnUrl') returnUrl: string,
  ) {
    const user = req.user;

    if (!user.stripe_customer_id) {
      throw new BadRequestException('User does not have a Stripe customer ID');
    }

    const url = await this.stripeService.createPortalSession(
      user.stripe_customer_id,
      returnUrl,
    );

    return { url };
  }

  @Post('webhook')
  @HttpCode(200)
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    if (!signature) {
      throw new BadRequestException('Missing stripe-signature header');
    }

    const event = this.stripeService.constructWebhookEvent(
      req.rawBody,
      signature,
    );

    if (!event) {
      throw new BadRequestException('Invalid webhook signature');
    }

    // Handle the event
    switch (event.type) {
      case 'customer.subscription.created':
        const subscriptionCreated = event.data.object as Stripe.Subscription;
        await this.stripeService.handleSubscriptionCreated(subscriptionCreated);

        // Send subscription confirmation email
        const customerCreated = await this.getCustomerEmail(
          subscriptionCreated.customer as string,
        );
        if (customerCreated) {
          await this.brevoService.sendTransactionalEmail(
            customerCreated,
            2, // Template ID for subscription confirmation
            { plan: this.getPlanNameFromSubscription(subscriptionCreated) },
          );
        }
        break;

      case 'customer.subscription.updated':
        const subscriptionUpdated = event.data.object as Stripe.Subscription;
        await this.stripeService.handleSubscriptionUpdated(subscriptionUpdated);
        break;

      case 'customer.subscription.deleted':
        const subscriptionDeleted = event.data.object as Stripe.Subscription;
        await this.stripeService.handleSubscriptionDeleted(subscriptionDeleted);

        // Send subscription cancellation email
        const customerDeleted = await this.getCustomerEmail(
          subscriptionDeleted.customer as string,
        );
        if (customerDeleted) {
          await this.brevoService.sendTransactionalEmail(
            customerDeleted,
            3, // Template ID for subscription cancellation
          );
        }
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return { received: true };
  }

  private async getCustomerEmail(customerId: string): Promise<string | null> {
    // This helper method retrieves the customer email from the database
    // You could also fetch it from Stripe, but DB is faster
    const user = await this.stripeService['userRepository'].findOne({
      where: { stripe_customer_id: customerId },
    });
    return user?.email || null;
  }

  private getPlanNameFromSubscription(
    subscription: Stripe.Subscription,
  ): string {
    const priceId = subscription.items.data[0]?.price.id;
    const priceIdMap = {
      [process.env.STRIPE_OFFER_A_PRICE_ID]: 'Offer A',
      [process.env.STRIPE_OFFER_B_PRICE_ID]: 'Offer B',
      [process.env.STRIPE_OFFER_C_PRICE_ID]: 'Offer C',
    };
    return priceIdMap[priceId] || 'Unknown Plan';
  }
}
