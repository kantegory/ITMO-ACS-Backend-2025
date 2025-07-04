import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Level } from '../enums/Level';

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
  goal?: string; 

  @Column({
    type: 'enum',
    enum: Level,
    nullable: true
  })
  activity_level?: Level;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  update_date!: Date;
}