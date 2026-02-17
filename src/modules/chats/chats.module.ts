import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from '../../entities';
import { ChatsApi } from './chats.api';
import { ChatsService } from './chats.service';
import { ChatGPTService } from './chatgpt.service';
import { ChatsController } from './chats.controller';
import { UsersModule } from '../users';
import { ChatMessagesModule } from '../chat-messages';
import { ChatAttachmentsModule } from '../chat-attachments';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat]),
    UsersModule,
    ChatMessagesModule,
    ChatAttachmentsModule,
  ],
  providers: [ChatsApi, ChatsService, ChatGPTService],
  controllers: [ChatsController],
  exports: [ChatsApi, ChatsService, ChatGPTService],
})
export class ChatsModule {}
