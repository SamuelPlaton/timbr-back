import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenUsageService } from '../modules/users/token-usage.service';
import { Feature, hasFeatureAccess } from '../config/subscription.config';

export const FEATURE_KEY = 'required_feature';

export const RequireFeature = (feature: Feature) =>
  Reflect.metadata(FEATURE_KEY, feature);

@Injectable()
export class FeatureGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenUsageService: TokenUsageService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredFeature = this.reflector.get<Feature>(
      FEATURE_KEY,
      context.getHandler(),
    );

    if (!requiredFeature) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id;

    if (!userId) {
      throw new ForbiddenException('Utilisateur non authentifié');
    }

    const tier = await this.tokenUsageService.getUserTier(userId);

    if (!hasFeatureAccess(tier, requiredFeature)) {
      throw new ForbiddenException({
        statusCode: 403,
        code: 'FEATURE_NOT_AVAILABLE',
        message:
          "Cette fonctionnalité n'est pas disponible avec votre abonnement actuel.",
        required_feature: requiredFeature,
        current_tier: tier,
      });
    }

    return true;
  }
}
