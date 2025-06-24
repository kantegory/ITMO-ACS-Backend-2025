import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Workout } from "./Workout";

@Entity()
export class WorkoutPlan {
  @PrimaryGeneratedColumn()
  plan_id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  level!: string;

  @Column()
  duration_weeks!: number;

  @OneToMany(() => Workout, (workout) => workout.plan)
  workouts!: Workout[];
}
