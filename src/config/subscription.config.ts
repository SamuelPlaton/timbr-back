export enum SubscriptionTier {
  FREE = 'Free',
  SOLO = 'Solo',
  BOOST = 'Boost',
  ELITE = 'Elite',
}

export const TOKEN_LIMITS: Record<SubscriptionTier, number> = {
  [SubscriptionTier.FREE]: 20_000,
  [SubscriptionTier.SOLO]: 400_000,
  [SubscriptionTier.BOOST]: 1_000_000,
  [SubscriptionTier.ELITE]: 2_000_000,
};

export enum Feature {
  CHAT_ACCESS = 'chat_access',
  FILE_ATTACHMENTS = 'file_attachments',
  ADVANCED_CHAT_TYPES = 'advanced_chat_types',
}

export const FEATURE_ACCESS: Record<Feature, SubscriptionTier[]> = {
  [Feature.CHAT_ACCESS]: [
    SubscriptionTier.FREE,
    SubscriptionTier.SOLO,
    SubscriptionTier.BOOST,
    SubscriptionTier.ELITE,
  ],
  [Feature.FILE_ATTACHMENTS]: [
    SubscriptionTier.SOLO,
    SubscriptionTier.BOOST,
    SubscriptionTier.ELITE,
  ],
  [Feature.ADVANCED_CHAT_TYPES]: [
    SubscriptionTier.BOOST,
    SubscriptionTier.ELITE,
  ],
};

const SUBSCRIPTION_NAME_MAP: Record<string, SubscriptionTier> = {
  Solo: SubscriptionTier.SOLO,
  Boost: SubscriptionTier.BOOST,
  Elite: SubscriptionTier.ELITE,
};

export function getTierFromSubscriptionName(
  name: string | null,
): SubscriptionTier {
  return SUBSCRIPTION_NAME_MAP[name] || SubscriptionTier.FREE;
}

export function getTokenLimit(tier: SubscriptionTier): number {
  return TOKEN_LIMITS[tier];
}

export function hasFeatureAccess(
  tier: SubscriptionTier,
  feature: Feature,
): boolean {
  return FEATURE_ACCESS[feature]?.includes(tier) ?? false;
}
