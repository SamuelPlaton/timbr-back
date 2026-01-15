import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat, ChatMessage } from '../../entities';
import { ChatsApi } from './chats.api';
import { ChatsService } from './chats.service';
import { ChatMessagesApi } from './chat-messages.api';
import { ChatMessagesService } from './chat-messages.service';
import { ChatGPTService } from './chatgpt.service';
import { ChatsController } from './chats.controller';
import { UsersModule } from '../users';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, ChatMessage]), UsersModule],
  providers: [
    ChatsApi,
    ChatsService,
    ChatMessagesApi,
    ChatMessagesService,
    ChatGPTService,
  ],
  controllers: [ChatsController],
  exports: [
    ChatsApi,
    ChatsService,
    ChatMessagesApi,
    ChatMessagesService,
    ChatGPTService,
  ],
})
export class ChatsModule {}
