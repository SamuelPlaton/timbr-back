import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { Chat } from './chat.entity';
import { ChatAttachment } from './chat-attachment.entity';

@Entity()
@Index(['chat', 'created_at'])
export class ChatMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Chat, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chat_id' })
  @Index()
  chat: Chat;

  @Column({ type: 'varchar', length: 20 })
  role: 'user' | 'assistant';

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'integer', default: 0 })
  token_cost: number;

  @OneToMany(() => ChatAttachment, (attachment) => attachment.message, {
    cascade: true,
  })
  attachments: ChatAttachment[];

  @Index()
  @CreateDateColumn()
  created_at: Date;
}
