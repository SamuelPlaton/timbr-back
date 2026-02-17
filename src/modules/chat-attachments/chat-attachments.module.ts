import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatAttachment } from '../../entities';
import { ChatAttachmentsApi } from './chat-attachments.api';
import { ChatAttachmentsService } from './chat-attachments.service';
import { S3Module } from '../s3/s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([ChatAttachment]), S3Module],
  providers: [ChatAttachmentsApi, ChatAttachmentsService],
  exports: [ChatAttachmentsApi, ChatAttachmentsService],
})
export class ChatAttachmentsModule {}
