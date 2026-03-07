import {
  AuditItem,
  AuditItemCategory,
  AuditItemType,
} from '../../../../entities';
import { AuditContext } from '../audit-context.type';

export interface AuditConfigItem {
  id: string;
  category: string;
  type: string;
  title: string;
  summary: string;
  content: string;
  priority: number;
  sources?: Array<{ url: string; title: string }>;
}

export abstract class BaseAuditGenerator {
  /**
   * Each subclass must declare its own config by importing its situation-specific JSON file.
   * This keeps config co-located with the generator that uses it.
   */
  protected abstract readonly config: AuditConfigItem[];

  abstract generate(ctx: AuditContext): Partial<AuditItem>[];

  protected createItem(
    configId: string,
    variables: Record<string, any> = {},
  ): Partial<AuditItem> {
    const configItem = this.config.find((item) => item.id === configId);

    if (!configItem) {
      throw new Error(`Audit config item not found: "${configId}"`);
    }

    let content = configItem.content;
    let title = configItem.title;
    let summary = configItem.summary;
    Object.keys(variables).forEach((key) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      const value = String(variables[key]);
      content = content.replace(regex, value);
      title = title.replace(regex, value);
      summary = summary.replace(regex, value);
    });

    return {
      type: configItem.type as AuditItemType,
      title,
      summary,
      content,
      category: configItem.category as AuditItemCategory,
      priority: configItem.priority,
      sources: configItem.sources ?? [],
    };
  }
}
