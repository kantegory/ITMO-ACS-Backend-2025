import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ExerciseProgress {
  @PrimaryGeneratedColumn()
  exercise_progress_id!: number;

  @Column()
  user_id!: number;

  @Column()
  exercise_id!: number;

  @Column({ type: 'date' })
  exercise_date!: Date;

  @Column({ nullable: true })
  equipment?: string;

  @Column()
  sets!: number;

  @Column()
  reps!: number;

  @Column({ type: 'text', nullable: true })
  notes?: string;
}