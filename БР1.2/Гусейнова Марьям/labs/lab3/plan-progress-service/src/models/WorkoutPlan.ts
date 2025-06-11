import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { WorkoutInPlan } from './WorkoutInPlan';
import { PlanProgress } from './PlanProgress';

@Entity()
export class WorkoutPlan {
  @PrimaryGeneratedColumn()
  plan_id!: number;

  @Column()
  user_id!: number;

  @Column()
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ nullable: true })
  plan_goal?: string;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  creation_date!: Date;

  @OneToMany(() => WorkoutInPlan, (workoutInPlan) => workoutInPlan.plan, { onDelete: 'CASCADE' }) // Если удаляем план, удаляем и связанные тренировки в плане
  workoutInPlans!: WorkoutInPlan[];

  @OneToMany(() => PlanProgress, (planProgress) => planProgress.workoutPlan, { onDelete: 'CASCADE' }) // Если удаляем план, удаляем и связанный прогресс по плану
  planProgress!: PlanProgress[];  
}