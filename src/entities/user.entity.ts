import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  Unique,
  Index,
  OneToOne,
} from 'typeorm';
import { RefreshToken } from './refresh-token.entity';
import { Onboarding } from './onboarding.entity';
import { Chat } from './chat.entity';
import { Subscription } from './subscription.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Unique(['email'])
  email: string;

  @Column()
  password_hash: string;

  @Column({ nullable: true })
  stripe_customer_id?: string;

  // Relationships
  @OneToOne(() => Onboarding, (onboarding) => onboarding.user)
  onboarding: Onboarding;

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];

  @OneToMany(() => Chat, (chat) => chat.user)
  chats: Chat[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refresh_tokens: RefreshToken[];

  // Timestamps
  @Index()
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, default: null })
  validated_at?: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at?: Date;
}
