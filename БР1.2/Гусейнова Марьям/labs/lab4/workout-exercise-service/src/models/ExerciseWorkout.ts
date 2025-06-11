import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Exercise } from './Exercise';
import { Workout } from './Workout';

@Entity()
export class ExerciseWorkout {
  @PrimaryGeneratedColumn()
  exercise_workout_id!: number;

  @ManyToOne(() => Exercise, (exercise) => exercise.exerciseWorkouts)
  @JoinColumn({ name: 'exercise_id' })
  exercise!: Exercise;

  @Column()
  exercise_id!: number;

  @ManyToOne(() => Workout, (workout) => workout.exerciseWorkouts)
  @JoinColumn({ name: 'workout_id' })
  workout!: Workout;

  @Column()
  workout_id!: number;

  @Column()
  sets!: number;

  @Column()
  reps!: number;

  @Column({ nullable: true })
  rest_time?: number;

  @Column()
  ordinal_number!: number;
}