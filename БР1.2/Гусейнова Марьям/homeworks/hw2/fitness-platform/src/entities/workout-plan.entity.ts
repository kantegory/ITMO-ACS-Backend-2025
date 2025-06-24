import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { WorkoutInPlan } from './workout-in-plan.entity';
import { PlanProgress } from './plan-progress.entity';

@Entity()
export class WorkoutPlan {
  @PrimaryGeneratedColumn()
  plan_id!: number;

  @ManyToOne(() => User, (user) => user.workoutPlans)
  @JoinColumn({ name: 'user_id' })
  user!: User;

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

  @OneToMany(() => WorkoutInPlan, (workoutInPlan) => workoutInPlan.plan)
  workoutInPlans!: WorkoutInPlan[];

  @OneToMany(() => PlanProgress, (planProgress) => planProgress.workoutPlan)
  planProgress!: PlanProgress[];  
}