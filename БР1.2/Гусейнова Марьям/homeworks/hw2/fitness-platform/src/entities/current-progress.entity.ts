import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class CurrentProgress {
  @PrimaryGeneratedColumn()
  progress_id!: number;

  @OneToOne(() => User, (user) => user.currentProgress)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column()
  user_id!: number;

  @Column({ type: 'float', nullable: true })
  current_weight?: number;

  @Column({ type: 'float', nullable: true })
  current_height?: number;

  @Column({ nullable: true })
  goal?: string; // 'lose weight', 'gain weight'

  @Column({ nullable: true })
  activity_level?: string;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  update_date!: Date;
}