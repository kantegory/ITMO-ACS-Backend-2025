import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { WorkoutPlan } from './workout-plan.entity';
import { Workout } from './workout.entity';

@Entity()
export class WorkoutInPlan {
  @PrimaryGeneratedColumn()
  workout_in_plan_id!: number;

  @ManyToOne(() => WorkoutPlan, (plan) => plan.workoutInPlans)
  @JoinColumn({ name: 'plan_id' })
  plan!: WorkoutPlan;

  @Column()
  plan_id!: number;

  @ManyToOne(() => Workout, (workout) => workout.workoutInPlans)
  @JoinColumn({ name: 'workout_id' })
  workout!: Workout;

  @Column()
  workout_id!: number;

  @Column()
  ordinal_number!: number;
}