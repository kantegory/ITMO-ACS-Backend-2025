import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { WorkoutPlan } from "./WorkoutPlan";
import { UserWorkoutProgress } from "./UserWorkoutProgress";

@Entity()
export class Workout {
  @PrimaryGeneratedColumn()
  workout_id!: number;

  @ManyToOne(() => WorkoutPlan, (plan) => plan.workouts)
  plan!: WorkoutPlan;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  video_url!: string;

  @Column()
  duration_minutes!: number;

  @Column()
  difficulty_level!: string;

  @Column()
  type!: string;

  @OneToMany(() => UserWorkoutProgress, (progress) => progress.workout)
  userWorkoutProgresses!: UserWorkoutProgress[];
}
