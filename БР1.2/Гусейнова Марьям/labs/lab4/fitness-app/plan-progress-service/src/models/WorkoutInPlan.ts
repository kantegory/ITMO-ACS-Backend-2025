import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { WorkoutPlan } from './WorkoutPlan';

@Entity()
@Unique(['plan_id', 'workout_id']) // чтобы одна тренировка не была дважды в одном плане
@Unique(['plan_id', 'ordinal_number']) // уникальность ordinal_number в рамках одного плана
export class WorkoutInPlan {
  @PrimaryGeneratedColumn()
  workout_in_plan_id!: number;

  @ManyToOne(() => WorkoutPlan, (plan) => plan.workoutInPlans, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'plan_id' })
  plan!: WorkoutPlan;

  @Column()
  plan_id!: number;

  @Column()
  workout_id!: number;

  @Column()
  ordinal_number!: number;
}