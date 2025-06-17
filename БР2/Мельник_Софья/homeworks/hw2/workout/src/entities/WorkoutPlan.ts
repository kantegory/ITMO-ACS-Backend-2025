import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Plan } from "./Plan";
import { Workout } from "./Workout";

@Entity()
export class WorkoutPlan {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Plan, (plan) => plan.workoutPlans)
  plan!: Plan;

  @ManyToOne(() => Workout, (workout) => workout.workoutPlans)
  workout!: Workout;

  @Column()
  day_of_week!: string;

  @Column()
  details!: string;

  @Column()
  calories_burned!: number;
}