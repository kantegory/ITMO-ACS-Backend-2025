import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { WorkoutInPlan } from './workout-in-plan.entity';
import { ExerciseWorkout } from './exercise-workout.entity';

@Entity()
export class Workout {
  @PrimaryGeneratedColumn()
  workout_id!: number;

  @Column()
  name!: string;

  @Column({ type: 'text'})
  description!: string;

  @Column()
  type!: string; // Например, 'cardio', 'strength', 'yoga'

  @Column()
  duration!: number;

  @Column({ nullable: true })
  video_url?: string;

  @Column({ type: 'text', nullable: true })
  guide?: string;

  @OneToMany(() => WorkoutInPlan, (workoutInPlan) => workoutInPlan.workout)
  workoutInPlans!: WorkoutInPlan[];

  @OneToMany(() => ExerciseWorkout, (exerciseWorkout) => exerciseWorkout.workout)
  exerciseWorkouts!: ExerciseWorkout[];
}