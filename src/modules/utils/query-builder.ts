import { NotFoundException } from '@nestjs/common';
import { EntityNotFoundError, In, Repository, SelectQueryBuilder } from 'typeorm';

export function prepareFilters(filters: Record<string, any>) {
  const result: Record<string, any> = {};
  for (const key in filters) {
    if (Array.isArray(filters[key])) {
      result[key] = In(filters[key]);
    } else {
      result[key] = filters[key];
    }
  }
  return result;
}

export class QueryBuilder<T> {
  private queryBuilder: SelectQueryBuilder<T>;

  constructor(
    private repository: Repository<T>,
    private entityAlias: string,
  ) {
    this.queryBuilder = this.repository.createQueryBuilder(entityAlias);
  }

  withRelations(relations: string[]): QueryBuilder<T> {
    relations.forEach((relation) => {
      const formattedRelation = relation.includes('.')
        ? relation
        : `${this.entityAlias}.${relation}`;
      const alias = relation
        .replace(`${this.entityAlias}.`, '')
        .replace('.', '_');
      this.queryBuilder.leftJoinAndSelect(formattedRelation, alias);
    });
    return this;
  }

  withFilters(filters: Record<string, any>): QueryBuilder<T> {
    Object.entries(filters).forEach(([key, value], index) => {
      // Handle nested objects like { user: { id: 'xxx' } }
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          const column = `${this.entityAlias}.${key}_${nestedKey}`;
          const paramName = `filter_${key}_${nestedKey}_${index}`;

          this.queryBuilder.andWhere(`${column} = :${paramName}`, {
            [paramName]: nestedValue,
          });
        });
        return;
      }

      const column = this.getRelationKey(key);
      const paramName = `filter_${key.replace(/\./g, '_')}_${index}`;

      if (value === null) {
        this.queryBuilder.andWhere(`${column} IS NULL`);
        return;
      }
      if (value === 'not_null') {
        this.queryBuilder.andWhere(`${column} IS NOT NULL`);
        return;
      }

      if (Array.isArray(value)) {
        this.queryBuilder.andWhere(`${column} IN (:...${paramName})`, {
          [paramName]: value,
        });
        return;
      }

      this.queryBuilder.andWhere(`${column} = :${paramName}`, {
        [paramName]: value,
      });
    });
    return this;
  }

  withSort(sort: Record<string, 'ASC' | 'DESC'>): QueryBuilder<T> {
    Object.entries(sort).forEach(([field, order]) => {
      this.queryBuilder.addOrderBy(this.getRelationKey(field), order);
    });
    return this;
  }

  withPagination(limit: number = 30, offset: number = 0): QueryBuilder<T> {
    this.queryBuilder.skip(offset).take(limit);
    return this;
  }

  async getMany(): Promise<T[]> {
    try {
      return await this.queryBuilder.getMany();
    } catch (error) {
      console.error('Query execution error:', error);
      throw error;
    }
  }

  async findOne(): Promise<T | null> {
    try {
      return this.queryBuilder.getOne();
    } catch (error) {
      console.error('Query execution error:', error);
    }
  }

  async findMany(): Promise<T[] | null> {
    try {
      return this.queryBuilder.getMany();
    } catch (error) {
      console.error('Query execution error:', error);
    }
  }

  async findOneOrFail(): Promise<T> {
    try {
      const result = await this.queryBuilder.getOne();
      if (!result) {
        throw new EntityNotFoundError(
          this.repository.target,
          'Entity not found',
        );
      }
      return result;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(`Entity not found`);
      }
      throw error;
    }
  }

  getQueryBuilder(): SelectQueryBuilder<T> {
    return this.queryBuilder;
  }

  getRelationKey(relation: string): string {
    return relation.includes('.')
      ? relation
      : `${this.entityAlias}.${relation}`;
  }
}
