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
  @Column({ type: 'jsonb' })
  company_information: {
    siren?: string;
    siret?: string;
    company_name?: string;
    legal_form?: string;
    address?: string;
    creation_date?: string;
    [key: string]: any;
  };

  @Column({ default: false })
  completed: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
