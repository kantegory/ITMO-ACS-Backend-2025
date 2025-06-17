import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { WorkoutPlan } from "./WorkoutPlan";
import { WorkoutCategory } from "./WorkoutCategory";

@Entity()
export class Workout {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column("text")
  description!: string;

  @Column()
  type!: string;

  @Column()
  difficulty!: string;

  @Column()
  duration!: number;

  @Column()
  video_url!: string;

  @Column("text")
  instruction!: string;

  @OneToMany(() => WorkoutPlan, (plan) => plan.workout)
  workoutPlans!: WorkoutPlan[];

  @OneToMany(() => WorkoutCategory, (category) => category.workout)
  workoutCategories!: WorkoutCategory[];
}