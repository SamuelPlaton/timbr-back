import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from '../../entities';
import { QueryBuilder } from '../utils';

@Injectable()
export class ChatsApi {
  constructor(
    @InjectRepository(Chat)
    private readonly repository: Repository<Chat>,
  ) {}

  public async findOne(filters: object = {}): Promise<Chat | null> {
    return new QueryBuilder<Chat>(this.repository, 'chat')
      .withRelations(['user'])
      .withFilters(filters)
      .findOne();
  }

  public async findMany(filters: object = {}): Promise<Chat[]> {
    return new QueryBuilder<Chat>(this.repository, 'chat')
      .withFilters(filters)
      .withSort({ updated_at: 'DESC' })
      .getMany();
  }

  public async findManyPaginated(
    filters: object = {},
    page: number = 1,
    limit: number = 20,
  ): Promise<{ data: Chat[]; total: number; hasMore: boolean }> {
    const skip = (page - 1) * limit;

    const queryBuilder = new QueryBuilder<Chat>(this.repository, 'chat')
      .withFilters(filters)
      .withSort({ updated_at: 'DESC' })
      .getQueryBuilder();

    const [data, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data,
      total,
      hasMore: skip + data.length < total,
    };
  }

  public async create(params: Partial<Chat>): Promise<Chat> {
    const chat = this.repository.create(params);
    return await this.repository.save(chat);
  }

  public async update(chat: Chat, params: Partial<Chat>): Promise<Chat> {
    Object.assign(chat, params);
    return await this.repository.save(chat);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
