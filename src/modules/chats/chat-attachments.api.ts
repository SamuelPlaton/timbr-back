import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatAttachment } from '../../entities';

@Injectable()
export class ChatAttachmentsApi {
  constructor(
    @InjectRepository(ChatAttachment)
    private readonly repository: Repository<ChatAttachment>,
  ) {}

  public async create(
    params: Partial<ChatAttachment>,
  ): Promise<ChatAttachment> {
    const attachment = this.repository.create(params);
    return await this.repository.save(attachment);
  }

  public async createMany(
    attachments: Partial<ChatAttachment>[],
  ): Promise<ChatAttachment[]> {
    const chatAttachments = this.repository.create(attachments);
    return await this.repository.save(chatAttachments);
  }

  public async findByMessage(messageId: string): Promise<ChatAttachment[]> {
    return await this.repository.find({
      where: { message: { id: messageId } },
      order: { created_at: 'ASC' },
    });
  }
}
