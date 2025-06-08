import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { PlanProgress } from './plan-progress.entity';
import { WorkoutPlan } from './workout-plan.entity';
import { CurrentProgress } from './current-progress.entity';
import { ExerciseProgress } from './exercise-progress.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  surname?: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ type: 'date', nullable: true })
  birth_date?: Date;

  @OneToMany(() => PlanProgress, (planProgress) => planProgress.user)
  planProgress!: PlanProgress[];

  @OneToMany(() => WorkoutPlan, (workoutPlan) => workoutPlan.user)
  workoutPlans!: WorkoutPlan[];

  @OneToOne(() => CurrentProgress, (currentProgress) => currentProgress.user)
  currentProgress!: CurrentProgress;

  @OneToMany(() => ExerciseProgress, (exerciseProgress) => exerciseProgress.user)
  exerciseProgress!: ExerciseProgress[];
}