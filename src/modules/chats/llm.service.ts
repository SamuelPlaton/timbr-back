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

export type LLMStreamEvent =
  | { type: 'sources'; sources: LLMSource[] }
  | { type: 'token'; text: string }
  | { type: 'title'; title: string }
  | { type: 'done'; token_cost: number; details: Record<string, unknown> }
  | { type: 'error'; message: string };

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

  async *sendMessageStream(
    message: string,
    chatType: ChatTypeEnum,
    tier: string,
    conversationHistory: ChatMessageInput[] = [],
  ): AsyncGenerator<LLMStreamEvent> {
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
      `Streaming LLM service: tier=${tier}, chat_type=${body.chat_type}`,
    );

    const response = await fetch(`${this.llmServiceUrl}/chat/stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok || !response.body) {
      const error = await response.text();
      this.logger.error(`LLM stream error (${response.status}): ${error}`);
      yield {
        type: 'error',
        message: `LLM service returned ${response.status}`,
      };
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // SSE events are separated by double newline
        const parts = buffer.split('\n\n');
        buffer = parts.pop() || '';

        for (const part of parts) {
          const line = part.trim();
          if (!line.startsWith('data: ')) continue;

          const payload = line.slice('data: '.length);
          try {
            yield JSON.parse(payload) as LLMStreamEvent;
          } catch (e) {
            this.logger.warn(`Failed to parse SSE payload: ${payload} ${e}`);
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }
}
