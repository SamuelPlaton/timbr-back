import { AuditItem } from '../../../../entities';
import { AuditContext } from '../audit-context.type';
import {
  AuditConfigItem,
  BaseAuditGenerator,
} from '../adapters/base.generator';

/** Concrete subclass to test the abstract BaseAuditGenerator */
class TestGenerator extends BaseAuditGenerator {
  protected readonly config: AuditConfigItem[] = [
    {
      id: 'test_card',
      category: 'Fiscalité',
      type: 'warning',
      priority: 2,
      title: 'Test title',
      summary: 'Test summary',
      content: 'Test content',
      sources: [{ url: 'https://example.com', title: 'Example' }],
    },
    {
      id: 'template_card',
      category: 'Social',
      type: 'success',
      priority: 1,
      title: 'Title for {{name}}',
      summary: 'Summary with {{amount}}€',
      content: 'Content: {{name}} earns {{amount}}€ in {{year}}',
    },
    {
      id: 'no_sources_card',
      category: 'TVA',
      type: 'information',
      priority: 3,
      title: 'No sources',
      summary: 'No sources summary',
      content: 'No sources content',
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  generate(_ctx: AuditContext): Partial<AuditItem>[] {
    return [];
  }

  // Expose createItem for testing
  public testCreateItem(
    configId: string,
    variables?: Record<string, any>,
  ): Partial<AuditItem> {
    return this.createItem(configId, variables);
  }
}

describe('BaseAuditGenerator — createItem', () => {
  let generator: TestGenerator;

  beforeEach(() => {
    generator = new TestGenerator();
  });

  it('should return a Partial<AuditItem> with correct fields from config', () => {
    const item = generator.testCreateItem('test_card');

    expect(item.type).toBe('warning');
    expect(item.title).toBe('Test title');
    expect(item.summary).toBe('Test summary');
    expect(item.content).toBe('Test content');
    expect(item.category).toBe('Fiscalité');
    expect(item.priority).toBe(2);
    expect(item.sources).toEqual([
      { url: 'https://example.com', title: 'Example' },
    ]);
  });

  it('should interpolate {{variable}} in title, summary, and content', () => {
    const item = generator.testCreateItem('template_card', {
      name: 'Alice',
      amount: 50000,
      year: 2026,
    });

    expect(item.title).toBe('Title for Alice');
    expect(item.summary).toBe('Summary with 50000€');
    expect(item.content).toBe('Content: Alice earns 50000€ in 2026');
  });

  it('should interpolate multiple occurrences of the same variable', () => {
    const item = generator.testCreateItem('template_card', {
      name: 'Bob',
      amount: 1000,
      year: 2025,
    });

    // {{name}} appears twice in content
    expect(item.content).toContain('Bob');
    expect(item.summary).toContain('1000');
  });

  it('should throw Error when config ID does not exist', () => {
    expect(() => generator.testCreateItem('nonexistent_id')).toThrow(
      'Audit config item not found: "nonexistent_id"',
    );
  });

  it('should return empty sources array when config has no sources', () => {
    const item = generator.testCreateItem('no_sources_card');

    expect(item.sources).toEqual([]);
  });
});
