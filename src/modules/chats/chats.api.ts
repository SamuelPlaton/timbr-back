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
      .withSort({ created_at: 'DESC' })
      .getMany();
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
