import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Request,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { hasFeatureAccess } from '../../config/subscription.config';
import type { Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ChatsService } from './chats.service';
import { ChatMessagesService } from '../chat-messages';
import { ChatAttachmentsService } from '../chat-attachments';
import { LLMService } from './llm.service';
import { UsersService, TokenUsageService } from '../users';
import { JwtAuthGuard } from '../../guards';
import { Feature } from '../../config/subscription.config';
import { ChatTypeEnum } from '../../entities';
import { PaginationQueryDto, UpsertMessageDto } from './chats.dto';
import { multerConfig } from '../../config/multer.config';
import { Chat } from '../../entities';

@Controller('chats')
@UseGuards(JwtAuthGuard)
export class ChatsController {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly chatMessagesService: ChatMessagesService,
    private readonly chatAttachmentsService: ChatAttachmentsService,
    private readonly llmService: LLMService,
    private readonly usersService: UsersService,
    private readonly tokenUsageService: TokenUsageService,
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

  @Post('messages')
  @UseInterceptors(FilesInterceptor('files', 5, multerConfig))
  async upsertMessage(
    @Request() req,
    @Body() body: UpsertMessageDto,
    @Res() res: Response,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    const user = await this.usersService.findOneOrFail({ id: req.user.id });
    await this.tokenUsageService.checkTokenLimit(user);
    const tier = await this.tokenUsageService.getUserTier(user.id);

    const hasFiles = files && files.length > 0;
    const isNewChat = !body.chatId;

    if (hasFiles && !hasFeatureAccess(tier, Feature.FILE_ATTACHMENTS)) {
      throw new ForbiddenException({
        code: 'FEATURE_NOT_AVAILABLE',
        message:
          'Les pièces jointes nécessitent un abonnement Solo ou supérieur.',
      });
    }

    // Validate params by branch
    let chat: Chat;
    let conversationHistory: { role: string; content: string }[] = [];

    if (isNewChat) {
      if (!body.type) {
        throw new BadRequestException(
          'Le champ "type" est requis pour un nouveau chat.',
        );
      }
      const advancedTypes = [ChatTypeEnum.COMPLETE, ChatTypeEnum.PEDAGOGUE];
      if (
        advancedTypes.includes(body.type) &&
        !hasFeatureAccess(tier, Feature.ADVANCED_CHAT_TYPES)
      ) {
        throw new ForbiddenException({
          code: 'FEATURE_NOT_AVAILABLE',
          message:
            'Ce type de chat nécessite un abonnement Boost ou supérieur.',
        });
      }
      // Temporary title, will be updated once LLM provides one
      chat = await this.chatsService.create({
        user,
        title: 'Nouvelle conversation',
        type: body.type,
        openai_thread_id: null,
      });
    } else {
      const existing = await this.chatsService.findOne({
        id: body.chatId,
        user: { id: user.id },
      });
      if (!existing) {
        throw new NotFoundException('Chat non trouvé');
      }
      chat = existing;

      const messagesResult = await this.chatMessagesService.findMany(
        chat.id,
        1,
        1000,
      );
      conversationHistory = messagesResult.data.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));
    }

    // Persist user message + attachments
    const userMessage = await this.chatMessagesService.create({
      chat,
      role: 'user',
      content: body.message,
      token_cost: 0,
    });

    let attachments = [];
    if (hasFiles) {
      attachments = await this.chatAttachmentsService.createMany(
        userMessage,
        files,
        user.id,
        chat.id,
      );
    }

    // Setup SSE response
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders();

    const send = (event: Record<string, unknown>) => {
      res.write(`data: ${JSON.stringify(event)}\n\n`);
    };

    // Send chat + user message immediately so the client can navigate/commit
    send({
      type: 'chat_ready',
      chat,
      user_message: { ...userMessage, attachments },
      is_new: isNewChat,
    });

    let assistantContent = '';
    let tokenCost = 0;
    let generatedTitle: string | null = null;
    let streamError: string | null = null;

    try {
      for await (const event of this.llmService.sendMessageStream(
        body.message,
        chat.type,
        tier,
        conversationHistory,
      )) {
        if (event.type === 'token') {
          assistantContent += event.text;
          send(event);
        } else if (event.type === 'sources') {
          send(event);
        } else if (event.type === 'title') {
          generatedTitle = event.title;
          send(event);
        } else if (event.type === 'done') {
          tokenCost = event.token_cost;
        } else if (event.type === 'error') {
          streamError = event.message;
        }
      }
    } catch (err) {
      streamError = err instanceof Error ? err.message : 'stream failed';
    }

    if (streamError) {
      send({ type: 'error', message: streamError });
      res.end();
      return;
    }

    const assistantMessage = await this.chatMessagesService.create({
      chat,
      role: 'assistant',
      content: assistantContent,
      token_cost: tokenCost,
    });

    await this.tokenUsageService.incrementTokenUsage(user.id, tokenCost);

    const chatPatch: Partial<Chat> = {};
    if (isNewChat && generatedTitle) {
      chatPatch.title = generatedTitle;
    }
    const finalChat = await this.chatsService.update(chat, chatPatch);

    send({
      type: 'done',
      chat: finalChat,
      assistant_message: { ...assistantMessage, attachments: [] },
      token_cost: tokenCost,
    });
    res.end();
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
