import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ChatsService } from './chats.service';
import { ChatMessagesService } from './chat-messages.service';
import { ChatAttachmentsService } from './chat-attachments.service';
import { ChatGPTService } from './chatgpt.service';
import { UsersService } from '../users';
import { JwtAuthGuard } from '../../guards';
import { CreateChatDto, PaginationQueryDto, SendMessageDto } from './chats.dto';
import { multerConfig } from '../../config/multer.config';

@Controller('chats')
@UseGuards(JwtAuthGuard)
export class ChatsController {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly chatMessagesService: ChatMessagesService,
    private readonly chatAttachmentsService: ChatAttachmentsService,
    private readonly chatGPTService: ChatGPTService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async getChats(@Request() req, @Query() query: PaginationQueryDto) {
    const user = await this.usersService.findOneOrFail({ id: req.user.id });
    return await this.chatsService.findManyPaginated(
      { user: { id: user.id } },
      query.page,
      query.limit,
    );
  }

  @Get(':id/messages')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async getChatMessages(
    @Request() req,
    @Param('id') id: string,
    @Query() query: PaginationQueryDto,
  ) {
    const user = await this.usersService.findOneOrFail({ id: req.user.id });
    const chat = await this.chatsService.findOne({
      id,
      user: { id: user.id },
    });

    if (!chat) {
      throw new NotFoundException('Chat non trouvé');
    }

    return await this.chatMessagesService.findMany(
      chat.id,
      query.page,
      query.limit,
    );
  }

  @Get(':id')
  async getChat(@Request() req, @Param('id') id: string) {
    const user = await this.usersService.findOneOrFail({ id: req.user.id });
    const chat = await this.chatsService.findOne({
      id,
      user: { id: user.id },
    });

    if (!chat) {
      throw new NotFoundException('Chat non trouvé');
    }

    return { data: chat };
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files', 5, multerConfig))
  async createChat(
    @Request() req,
    @Body() body: CreateChatDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    const user = await this.usersService.findOneOrFail({ id: req.user.id });
    const hasFiles = files && files.length > 0;

    // Generate title from first message
    const title = await this.chatGPTService.generateChatTitle(
      body.firstMessage,
    );

    // Create chat first so we have the chatId for S3 path
    const chat = await this.chatsService.create({
      user,
      title,
      type: body.type,
      openai_thread_id: null,
    });

    // Upload attachments to S3 before calling OpenAI
    let attachments = [];
    let attachmentUrls: string[] = [];
    // Create user message first so we can link attachments
    const userMessage = await this.chatMessagesService.create({
      chat,
      role: 'user',
      content: body.firstMessage,
      token_cost: 0,
    });

    if (hasFiles) {
      attachments = await this.chatAttachmentsService.createMany(
        userMessage,
        files,
        user.id,
        chat.id,
      );
      attachmentUrls = attachments.map((a) => a.path);
    }

    // Get response from ChatGPT with S3 URLs
    const response = await this.chatGPTService.sendMessage(
      body.firstMessage,
      body.type,
      [],
      attachmentUrls.length > 0 ? attachmentUrls : undefined,
    );

    // Store assistant message
    const assistantMessage = await this.chatMessagesService.create({
      chat,
      role: 'assistant',
      content: response.content,
      token_cost: response.token_cost,
    });

    return {
      data: {
        chat,
        messages: [
          { ...userMessage, attachments },
          { ...assistantMessage, attachments: [] },
        ],
      },
    };
  }

  @Post(':id/messages')
  @UseInterceptors(FilesInterceptor('files', 5, multerConfig))
  async sendMessage(
    @Request() req,
    @Param('id') id: string,
    @Body() body: SendMessageDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    const user = await this.usersService.findOneOrFail({ id: req.user.id });
    const chat = await this.chatsService.findOne({
      id,
      user: { id: user.id },
    });

    if (!chat) {
      throw new NotFoundException('Chat non trouvé');
    }

    // Upload attachments to S3 first so we have URLs for OpenAI
    let attachmentUrls: string[] = [];
    const hasFiles = files && files.length > 0;

    // Get existing conversation from chat_message table
    const messagesResult = await this.chatMessagesService.findMany(
      chat.id,
      1,
      1000,
    );

    // Build conversation history, reconstructing array format for messages with attachments
    const conversationHistory = messagesResult.data.map((msg) => {
      const hasMessageAttachments =
        msg.attachments && msg.attachments.length > 0;

      if (hasMessageAttachments && msg.role === 'user') {
        return {
          role: msg.role,
          content: [
            { type: 'text' as const, text: msg.content },
            ...msg.attachments.map((att) => ({
              type: 'image_url' as const,
              image_url: { url: att.path },
            })),
          ],
        };
      }

      return {
        role: msg.role,
        content: msg.content,
      };
    });

    // Store new messages in chat_message table first
    const newMessages = await this.chatMessagesService.createMany([
      { chat, role: 'user', content: body.message, token_cost: 0 },
    ]);

    // Upload attachments if any
    let attachments = [];
    if (hasFiles) {
      attachments = await this.chatAttachmentsService.createMany(
        newMessages[0],
        files,
        user.id,
        chat.id,
      );
      attachmentUrls = attachments.map((a) => a.path);
    }

    // Get response from ChatGPT with full conversation history
    const response = await this.chatGPTService.sendMessage(
      body.message,
      chat.type,
      conversationHistory,
      attachmentUrls.length > 0 ? attachmentUrls : undefined,
    );

    // Store assistant response
    const assistantMessages = await this.chatMessagesService.createMany([
      {
        chat,
        role: 'assistant',
        content: response.content,
        token_cost: response.token_cost,
      },
    ]);

    // Update chat's updated_at timestamp
    const updatedChat = await this.chatsService.update(chat, {});

    return {
      data: {
        chat: updatedChat,
        messages: [
          {
            ...newMessages[0],
            attachments,
          },
          {
            ...assistantMessages[0],
            attachments: [],
          },
        ],
      },
    };
  }

  @Delete(':id')
  async deleteChat(@Request() req, @Param('id') id: string) {
    const user = await this.usersService.findOneOrFail({ id: req.user.id });
    const chat = await this.chatsService.findOne({
      id,
      user: { id: user.id },
    });

    if (!chat) {
      throw new NotFoundException('Chat non trouvé');
    }

    await this.chatsService.delete(id);

    return { message: 'Chat supprimé avec succès' };
  }
}
