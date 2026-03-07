import { AuditItem } from '../../../../entities';
import { AuditContext } from '../audit-context.type';
import { BaseAuditGenerator } from '../adapters/base.generator';

/**
 * Wraps a generator to spy on which config IDs are used by createItem.
 * Returns both the items and the list of config IDs that were created.
 */
export function generateWithIds(
  generator: BaseAuditGenerator,
  ctx: AuditContext,
): { items: Partial<AuditItem>[]; ids: string[] } {
  const ids: string[] = [];
  const originalCreateItem = (generator as any).createItem.bind(generator);

  (generator as any).createItem = (
    configId: string,
    variables?: Record<string, any>,
  ) => {
    ids.push(configId);
    return originalCreateItem(configId, variables);
  };

  const items = generator.generate(ctx);

  // Restore original
  (generator as any).createItem = originalCreateItem;

  return { items, ids };
}

/**
 * Shorthand: generate and return only the IDs.
 */
export function getCardIds(
  generator: BaseAuditGenerator,
  ctx: AuditContext,
): string[] {
  return generateWithIds(generator, ctx).ids;
}
