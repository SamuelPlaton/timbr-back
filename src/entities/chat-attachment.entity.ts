import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { ChatMessage } from './chat-message.entity';

@Entity()
@Index(['message', 'created_at'])
export class ChatAttachment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ChatMessage, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'message_id' })
  @Index()
  message: ChatMessage;

  @Column({ type: 'varchar', length: 255 })
  filename: string; // Stored filename (e.g., "uuid.jpg")

  @Column({ type: 'varchar', length: 255 })
  original_name: string; // Original filename from user

  @Column({ type: 'varchar', length: 100 })
  mime_type: string; // e.g., "image/jpeg", "application/pdf"

  @Column({ type: 'integer' })
  size: number; // File size in bytes

  @Column({ type: 'varchar', length: 500 })
  path: string; // Relative path to file

  @Index()
  @CreateDateColumn()
  created_at: Date;
}
