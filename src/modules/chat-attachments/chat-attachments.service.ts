import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { ChatAttachmentsApi } from './chat-attachments.api';
import { ChatAttachment, ChatMessage } from '../../entities';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class ChatAttachmentsService {
  constructor(
    private chatAttachmentsApi: ChatAttachmentsApi,
    private s3Service: S3Service,
  ) {}

  private async convertPdfToImages(
    buffer: Buffer,
  ): Promise<{ buffer: Buffer; page: number }[]> {
    const { pdf } = await (eval('import("pdf-to-img")') as Promise<
      typeof import('pdf-to-img')
    >);
    const document = await pdf(buffer, { scale: 2 });

    const pages: { buffer: Buffer; page: number }[] = [];
    let pageNumber = 1;

    for await (const image of document) {
      pages.push({ buffer: Buffer.from(image), page: pageNumber });
      pageNumber++;
    }

    return pages;
  }

  async createMany(
    message: ChatMessage,
    files: Express.Multer.File[],
    userId: string,
    chatId: string,
  ): Promise<ChatAttachment[]> {
    const folder = `attachments/${userId}/${chatId}`;
    const attachmentData: Partial<ChatAttachment>[] = [];

    for (const file of files) {
      if (file.mimetype === 'application/pdf') {
        const pages = await this.convertPdfToImages(file.buffer);

        for (const { buffer, page } of pages) {
          const filename = `${uuidv4()}.png`;
          const pngFile = {
            buffer,
            mimetype: 'image/png',
          } as Express.Multer.File;

          const url = await this.s3Service.uploadFile(
            pngFile,
            folder,
            filename,
          );

          const baseName = file.originalname.replace(/\.pdf$/i, '');
          attachmentData.push({
            message,
            filename,
            original_name: `${baseName} - page ${page}.png`,
            mime_type: 'image/png',
            size: buffer.length,
            path: url,
          });
        }
      } else {
        const filename = `${uuidv4()}${extname(file.originalname)}`;
        const url = await this.s3Service.uploadFile(file, folder, filename);

        attachmentData.push({
          message,
          filename,
          original_name: file.originalname,
          mime_type: file.mimetype,
          size: file.size,
          path: url,
        });
      }
    }

    return this.chatAttachmentsApi.createMany(attachmentData);
  }

  async findByMessage(messageId: string): Promise<ChatAttachment[]> {
    return this.chatAttachmentsApi.findByMessage(messageId);
  }
}
