import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { WorkoutPlan } from './WorkoutPlan';

@Entity()
export class PlanProgress {
  @PrimaryGeneratedColumn()
  plan_progress_id!: number;

  @ManyToOne(() => WorkoutPlan, (workoutPlan) => workoutPlan.planProgress, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'plan_id' })
  workoutPlan!: WorkoutPlan;

  @Column()
  user_id!: number;

  @Column()
  plan_id!: number;

  @Column({ type: 'date' })
  plan_date!: Date;

  @Column()
  duration!: number;

  @Column({ type: 'text', nullable: true })
  notes?: string;
}