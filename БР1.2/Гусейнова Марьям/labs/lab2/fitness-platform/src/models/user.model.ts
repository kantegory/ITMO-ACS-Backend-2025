import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { PlanProgress } from './plan-progress.model';
import { WorkoutPlan } from './workout-plan.model';
import { CurrentProgress } from './current-progress.model';
import { ExerciseProgress } from './exercise-progress.model';

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