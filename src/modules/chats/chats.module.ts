import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat, ChatMessage, ChatAttachment } from '../../entities';
import { ChatsApi } from './chats.api';
import { ChatsService } from './chats.service';
import { ChatMessagesApi } from './chat-messages.api';
import { ChatMessagesService } from './chat-messages.service';
import { ChatAttachmentsApi } from './chat-attachments.api';
import { ChatAttachmentsService } from './chat-attachments.service';
import { ChatGPTService } from './chatgpt.service';
import { ChatsController } from './chats.controller';
import { UsersModule } from '../users';
import { S3Module } from '../s3/s3.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, ChatMessage, ChatAttachment]),
    UsersModule,
    S3Module,
  ],
  providers: [
    ChatsApi,
    ChatsService,
    ChatMessagesApi,
    ChatMessagesService,
    ChatAttachmentsApi,
    ChatAttachmentsService,
    ChatGPTService,
  ],
  controllers: [ChatsController],
  exports: [
    ChatsApi,
    ChatsService,
    ChatMessagesApi,
    ChatMessagesService,
    ChatAttachmentsApi,
    ChatAttachmentsService,
    ChatGPTService,
  ],
})
export class ChatsModule {}
