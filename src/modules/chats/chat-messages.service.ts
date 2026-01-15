import { Injectable } from '@nestjs/common';
import { ChatMessagesApi } from './chat-messages.api';
import { ChatMessage } from '../../entities';

@Injectable()
export class ChatMessagesService {
  constructor(private chatMessagesApi: ChatMessagesApi) {}

  async findMany(
    chatId: string,
    page: number = 1,
    limit: number = 20,
  ): Promise<{ data: ChatMessage[]; total: number; hasMore: boolean }> {
    return this.chatMessagesApi.findMany(chatId, page, limit);
  }

  async create(params: Partial<ChatMessage>): Promise<ChatMessage> {
    return this.chatMessagesApi.create(params);
  }

  async createMany(messages: Partial<ChatMessage>[]): Promise<ChatMessage[]> {
    return this.chatMessagesApi.createMany(messages);
  }
}
