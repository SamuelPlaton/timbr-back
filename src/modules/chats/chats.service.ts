import { Injectable } from '@nestjs/common';
import { ChatsApi } from './chats.api';
import { Chat } from '../../entities';

@Injectable()
export class ChatsService {
  constructor(private chatsApi: ChatsApi) {}

  async findOne(filters: object = {}): Promise<Chat | null> {
    return this.chatsApi.findOne(filters);
  }

  async findMany(filters: object = {}): Promise<Chat[]> {
    return this.chatsApi.findMany(filters);
  }

  async findManyPaginated(
    filters: object = {},
    page: number = 1,
    limit: number = 20,
  ): Promise<{ data: Chat[]; total: number; hasMore: boolean }> {
    return this.chatsApi.findManyPaginated(filters, page, limit);
  }

  async create(params: Partial<Chat>): Promise<Chat> {
    return this.chatsApi.create(params);
  }

  async update(chat: Chat, params: Partial<Chat>): Promise<Chat> {
    return this.chatsApi.update(chat, params);
  }

  async delete(id: string): Promise<void> {
    return this.chatsApi.delete(id);
  }
}
