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
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatMessagesService } from './chat-messages.service';
import { ChatGPTService } from './chatgpt.service';
import { UsersService } from '../users';
import { JwtAuthGuard } from '../../guards';
import { CreateChatDto, PaginationQueryDto, SendMessageDto } from './chats.dto';

@Controller('chats')
@UseGuards(JwtAuthGuard)
export class ChatsController {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly chatMessagesService: ChatMessagesService,
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
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createChat(@Request() req, @Body() body: CreateChatDto) {
    const user = await this.usersService.findOneOrFail({ id: req.user.id });

    // Generate title from first message
    const title = await this.chatGPTService.generateChatTitle(
      body.firstMessage,
    );

    // Get response from ChatGPT
    const response = await this.chatGPTService.sendMessage(
      body.firstMessage,
      body.type,
    );

    // Create chat
    const chat = await this.chatsService.create({
      user,
      title,
      type: body.type,
      openai_thread_id: null,
    });

    // Store messages in chat_message table
    const messages = await this.chatMessagesService.createMany([
      { chat, role: 'user', content: body.firstMessage, token_cost: 0 },
      {
        chat,
        role: 'assistant',
        content: response.content,
        token_cost: response.token_cost,
      },
    ]);

    return {
      data: {
        chat,
        messages,
      },
    };
  }

  @Post(':id/messages')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async sendMessage(
    @Request() req,
    @Param('id') id: string,
    @Body() body: SendMessageDto,
  ) {
    const user = await this.usersService.findOneOrFail({ id: req.user.id });
    const chat = await this.chatsService.findOne({
      id,
      user: { id: user.id },
    });

    if (!chat) {
      throw new NotFoundException('Chat non trouvé');
    }

    // Get existing conversation from chat_message table
    // Fetch all messages without pagination for conversation context
    const messagesResult = await this.chatMessagesService.findMany(
      chat.id,
      1,
      1000, // Large limit to get all messages for context
    );

    const conversationHistory = messagesResult.data.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Get response from ChatGPT with full conversation history
    const response = await this.chatGPTService.sendMessage(
      body.message,
      chat.type,
      conversationHistory,
    );

    // Store new messages in chat_message table
    const newMessages = await this.chatMessagesService.createMany([
      { chat, role: 'user', content: body.message, token_cost: 0 },
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
        messages: newMessages,
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
