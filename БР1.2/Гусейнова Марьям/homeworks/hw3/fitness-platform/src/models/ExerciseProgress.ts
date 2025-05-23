import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Exercise } from './Exercise';

@Entity()
export class ExerciseProgress {
  @PrimaryGeneratedColumn()
  exercise_progress_id!: number;

  @ManyToOne(() => User, (user) => user.exerciseProgress)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column()
  user_id!: number;

  @ManyToOne(() => Exercise, (exercise) => exercise.exerciseProgress)
  @JoinColumn({ name: 'exercise_id' })
  exercise!: Exercise;

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