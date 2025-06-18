import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { WorkoutCategory } from "./WorkoutCategory";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @OneToMany(() => WorkoutCategory, (workoutCategory) => workoutCategory.category)
  workoutCategories!: WorkoutCategory[];
}