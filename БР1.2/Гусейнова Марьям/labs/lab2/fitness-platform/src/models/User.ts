import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { PlanProgress } from './PlanProgress';
import { WorkoutPlan } from './WorkoutPlan';
import { CurrentProgress } from './CurrentProgress';
import { ExerciseProgress } from './ExerciseProgress';
import { Gender } from '../enums/Gender';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id!: number; 

  @Column()
  firstName!: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  passwordHash!: string;

  @Column({
    type: 'enum',
    enum: Gender, 
    nullable: true
  })
  gender?: Gender;

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