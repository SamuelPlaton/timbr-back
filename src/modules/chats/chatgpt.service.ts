import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatTypeEnum } from '../../entities';

type TextContent = { type: 'text'; text: string };
type ImageContent = {
  type: 'image_url';
  image_url: { url: string };
};
type MessageContent = string | (TextContent | ImageContent)[];

interface ChatMessageInput {
  role: string;
  content: MessageContent;
}

@Injectable()
export class ChatGPTService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  private getSystemPrompt(type: ChatTypeEnum): string {
    const basePrompt =
      'Tu es un assistant expert en administration française pour les entreprises. ' +
      'Tu aides les entrepreneurs avec la TVA, les aides, les impôts et toutes les démarches administratives.';

    switch (type) {
      case ChatTypeEnum.FAST:
        return (
          basePrompt +
          ' Donne des réponses courtes et directes, allant droit au but.'
        );
      case ChatTypeEnum.COMPLETE:
        return (
          basePrompt +
          ' Fournis des réponses détaillées et complètes avec tous les détails nécessaires.'
        );
      case ChatTypeEnum.PEDAGOGUE:
        return (
          basePrompt +
          ' Explique de manière pédagogique, étape par étape, comme si tu enseignais à un débutant.'
        );
      default:
        return basePrompt;
    }
  }

  private buildUserContent(
    message: string,
    attachmentUrls?: string[],
  ): MessageContent {
    if (!attachmentUrls || attachmentUrls.length === 0) {
      return message;
    }

    const content: (TextContent | ImageContent)[] = [
      { type: 'text', text: message },
    ];

    for (const url of attachmentUrls) {
      content.push({
        type: 'image_url',
        image_url: { url },
      });
    }

    return content;
  }

  async sendMessage(
    message: string,
    chatType: ChatTypeEnum,
    conversationHistory: ChatMessageInput[] = [],
    attachmentUrls?: string[],
  ): Promise<{ content: string; token_cost: number }> {
    const hasAttachments =
      (attachmentUrls && attachmentUrls.length > 0) ||
      conversationHistory.some(
        (msg) =>
          Array.isArray(msg.content) &&
          msg.content.some((c) => c.type === 'image_url'),
      );

    const messages = [
      {
        role: 'system' as const,
        content: this.getSystemPrompt(chatType),
      },
      ...conversationHistory,
      {
        role: 'user' as const,
        content: this.buildUserContent(message, attachmentUrls),
      },
    ];

    const model = hasAttachments
      ? 'gpt-4.1'
      : process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

    const completion = await this.openai.chat.completions.create({
      model,
      messages: messages as any,
    });

    return {
      content: completion.choices[0].message.content,
      token_cost: completion.usage.total_tokens,
    };
  }

  async generateChatTitle(firstMessage: string): Promise<string> {
    const completion = await this.openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'Génère un titre court (maximum 50 caractères) qui résume le sujet de la question suivante.',
        },
        {
          role: 'user',
          content: firstMessage,
        },
      ],
    });

    return completion.choices[0].message.content || 'Nouvelle conversation';
  }
}
