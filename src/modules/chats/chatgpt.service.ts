import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatTypeEnum } from '../../entities';

@Injectable()
export class ChatGPTService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  /**
   * Get system prompt based on chat type
   */
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

  /**
   * Send a message to ChatGPT and get a response
   */
  async sendMessage(
    message: string,
    chatType: ChatTypeEnum,
    conversationHistory: Array<{ role: string; content: string }> = [],
  ): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: this.getSystemPrompt(chatType),
      },
      ...conversationHistory,
      {
        role: 'user',
        content: message,
      },
    ];

    const completion = await this.openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: messages as any,
    });
    console.log('completion', completion);
    return completion.choices[0].message.content;
  }

  /**
   * Generate a summary/title for a chat based on the first message
   */
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
