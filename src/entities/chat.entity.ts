import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { ChatTypeEnum } from './chat-type.enum';

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.chats, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', length: 255 })
  title: string; // Titre/résumé du chat

  @Column({ type: 'varchar', length: 50 })
  type: ChatTypeEnum; // "fast" | "complete" | "pedagogue"

  @Column({ type: 'text', nullable: true })
  openai_thread_id: string; // ID du thread OpenAI pour récupérer la conversation

  @Column({ type: 'jsonb', default: [] })
  conversation: ConversationMessage[]; // Historique complet de la conversation

  @Index()
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
