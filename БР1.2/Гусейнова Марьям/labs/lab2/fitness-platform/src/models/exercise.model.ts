import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ExerciseProgress } from './exercise-progress.model';
import { ExerciseWorkout } from './exercise-workout.model';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  exercise_id!: number;

  @Column()
  name!: string;

  @Column({ type: 'text'})
  description!: string;

  @Column()
  muscle_group!: string; // Например, 'chest', 'legs'

  @Column({ nullable: true })
  equipment?: string;

  @Column({ nullable: true })
  video_url?: string;

  @OneToMany(() => ExerciseProgress, (exerciseProgress) => exerciseProgress.exercise)
  exerciseProgress!: ExerciseProgress[];

  @OneToMany(() => ExerciseWorkout, (exerciseWorkout) => exerciseWorkout.exercise)
  exerciseWorkouts!: ExerciseWorkout[];
}