import {
  AuditItem,
  AuditItemCategory,
  AuditItemType,
} from '../../../../entities';
import { CompanyInformation } from '../../../../types/company-information.type';

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

  abstract generate(companyInfo: CompanyInformation): Partial<AuditItem>[];

  protected createItem(
    configId: string,
    variables: Record<string, any> = {},
  ): Partial<AuditItem> {
    const configItem = this.config.find((item) => item.id === configId);

    if (!configItem) {
      throw new Error(`Audit config item not found: "${configId}"`);
    }

    let content = configItem.content;
    Object.keys(variables).forEach((key) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      content = content.replace(regex, String(variables[key]));
    });

    return {
      type: configItem.type as AuditItemType,
      title: configItem.title,
      summary: configItem.summary,
      content,
      category: configItem.category as AuditItemCategory,
      priority: configItem.priority,
      sources: configItem.sources ?? [],
    };
  }
}
