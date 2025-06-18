import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Workout } from "./Workout";
import { Category } from "./Category";

@Entity()
export class WorkoutCategory {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Workout, (workout) => workout.workoutCategories)
  workout!: Workout;

  @ManyToOne(() => Category, (category) => category.workoutCategories)
  category!: Category;
}