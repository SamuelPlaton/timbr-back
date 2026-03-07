import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
@Entity()
export class Onboarding {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.onboarding, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Étape 1: Situation de l'entrepreneur
  @Column({ type: 'varchar', length: 255 })
  situation: string; // "Futur Auto-Entrepreneur" | "Auto-Entrepreneur" | "SARL/SASU"

  // Étape 2: Sujets d'intérêt (stocké en JSON)
  @Column({ type: 'jsonb' })
  interested_subjects: string[]; // ["VAT", "Aides", "Impôts", ...]

  // Étape 3: Informations de l'entreprise (stocké en JSON)
  // Raw situation-specific fields stored as JSONB. The `situation` discriminant
  // lives in its own column above and is merged at audit-generation time.
  @Column({ type: 'jsonb' })
  company_information: Record<string, any>;

  @Column({ default: false })
  completed: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
