import { Injectable, Logger } from '@nestjs/common';
import { ChatTypeEnum } from '../../entities';

interface ChatMessageInput {
  role: string;
  content: string;
}

interface LLMSource {
  title: string;
  url: string;
}

interface LLMChatResponse {
  content: string;
  token_cost: number;
  sources: LLMSource[];
  title: string | null;
}

@Injectable()
export class LLMService {
  private readonly logger = new Logger(LLMService.name);
  private readonly llmServiceUrl: string;

  constructor() {
    this.llmServiceUrl = process.env.LLM_SERVICE_URL || 'http://localhost:5001';
  }

  private getChatType(type: ChatTypeEnum): string {
    switch (type) {
      case ChatTypeEnum.FAST:
        return 'fast';
      case ChatTypeEnum.COMPLETE:
        return 'complete';
      case ChatTypeEnum.PEDAGOGUE:
        return 'pedagogue';
      default:
        return 'fast';
    }
  }

  async sendMessage(
    message: string,
    chatType: ChatTypeEnum,
    tier: string,
    conversationHistory: ChatMessageInput[] = [],
  ): Promise<LLMChatResponse> {
    // Keep only text content from history (last 10 messages)
    const context = conversationHistory.slice(-10).map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    const body = {
      question: message,
      chat_type: this.getChatType(chatType),
      tier,
      context,
    };

    this.logger.debug(
      `Calling LLM service: tier=${tier}, chat_type=${body.chat_type}`,
    );

    const response = await fetch(`${this.llmServiceUrl}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      this.logger.error(`LLM service error (${response.status}): ${error}`);
      throw new Error(`LLM service returned ${response.status}`);
    }

    const data = await response.json();

    return {
      content: data.answer,
      token_cost: data.token_cost,
      sources: data.sources || [],
      title: data.title || null,
    };
  }
}
