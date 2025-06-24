import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { WorkoutPlan } from './workout-plan.entity';

@Entity()
export class PlanProgress {
  @PrimaryGeneratedColumn()
  plan_progress_id!: number;

  @ManyToOne(() => User, (user) => user.planProgress)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => WorkoutPlan, (workoutPlan) => workoutPlan.planProgress)
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