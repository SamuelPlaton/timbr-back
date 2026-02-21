import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Audit } from './audit.entity';

export enum AuditItemType {
  DANGER = 'danger',
  WARNING = 'warning',
  SUCCESS = 'success',
  INFORMATION = 'information',
}

export enum AuditItemCategory {
  TNS = 'TNS',
  FISCALITE = 'Fiscalité',
  SOCIAL = 'Social',
  SIMULATION = 'Simulation',
  RETRAITE = 'Retraite',
  DEMISSION = 'Démission',
  ARE = 'ARE',
  AGE = 'AGE',
  TVA = 'TVA',
}

export enum AuditItemStatus {
  LIKED = 'liked',
  DISLIKED = 'disliked',
  NEUTRAL = 'neutral',
}

export interface AuditItemSource {
  url: string;
  title: string;
}

@Entity()
export class AuditItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Audit, (audit) => audit.audit_items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'audit_id' })
  audit: Audit;

  @Column({
    type: 'enum',
    enum: AuditItemType,
  })
  type: AuditItemType;

  @Column({ type: 'varchar', length: 500 })
  title: string;

  @Column({ type: 'text' })
  summary: string;

  @Column({ type: 'text' })
  content: string;

  @Column({
    type: 'enum',
    enum: AuditItemCategory,
  })
  category: AuditItemCategory;

  @Column({
    type: 'enum',
    enum: AuditItemStatus,
    default: AuditItemStatus.NEUTRAL,
  })
  status: AuditItemStatus;

  @Column({ type: 'smallint' })
  priority: number;

  @Column({ type: 'jsonb', nullable: true })
  sources: AuditItemSource[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
