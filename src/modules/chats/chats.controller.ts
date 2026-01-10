import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  ValidationPipe,
  UsePipes,
  NotFoundException,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatGPTService } from './chatgpt.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CreateChatDto, SendMessageDto } from './chats.dto';

@Controller('chats')
@UseGuards(JwtAuthGuard)
export class ChatsController {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly chatGPTService: ChatGPTService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async getChats(@Request() req) {
    const user = await this.usersService.findOneOrFail({ id: req.user.id });
    const chats = await this.chatsService.findMany({
      user: { id: user.id },
    });

    return { data: chats };
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

    // Build conversation history
    const conversation = [
      { role: 'user' as const, content: body.firstMessage },
      { role: 'assistant' as const, content: response },
    ];

    // Create chat with conversation
    const chat = await this.chatsService.create({
      user,
      title,
      type: body.type,
      conversation,
      openai_thread_id: null,
    });

    return {
      data: chat,
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

    // Get existing conversation from database
    const conversationHistory = chat.conversation || [];

    // Get response from ChatGPT with full conversation history
    const response = await this.chatGPTService.sendMessage(
      body.message,
      chat.type,
      conversationHistory,
    );

    // Update conversation with new messages
    const updatedConversation = [
      ...conversationHistory,
      { role: 'user' as const, content: body.message },
      { role: 'assistant' as const, content: response },
    ];

    // Update chat with new conversation
    const updatedChat = await this.chatsService.update(chat, {
      conversation: updatedConversation,
    });

    return {
      data: updatedChat,
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
