import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from '../../entities';

@Injectable()
export class ChatMessagesApi {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly repository: Repository<ChatMessage>,
  ) {}

  public async findMany(
    chatId: string,
    page: number = 1,
    limit: number = 20,
  ): Promise<{ data: ChatMessage[]; total: number; hasMore: boolean }> {
    const skip = (page - 1) * limit;

    const [data, total] = await this.repository.findAndCount({
      where: { chat: { id: chatId } },
      order: { created_at: 'ASC' },
      skip,
      take: limit,
    });

    return {
      data,
      total,
      hasMore: skip + data.length < total,
    };
  }

  public async create(params: Partial<ChatMessage>): Promise<ChatMessage> {
    const message = this.repository.create(params);
    return await this.repository.save(message);
  }

  public async createMany(
    messages: Partial<ChatMessage>[],
  ): Promise<ChatMessage[]> {
    const chatMessages = this.repository.create(messages);
    return await this.repository.save(chatMessages);
  }
}
