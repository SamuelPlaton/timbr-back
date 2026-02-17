import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from '../../entities';
import { ChatMessagesApi } from './chat-messages.api';
import { ChatMessagesService } from './chat-messages.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage])],
  providers: [ChatMessagesApi, ChatMessagesService],
  exports: [ChatMessagesApi, ChatMessagesService],
})
export class ChatMessagesModule {}
