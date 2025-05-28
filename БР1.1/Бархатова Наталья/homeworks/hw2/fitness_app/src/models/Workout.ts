import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { TrainingPlan } from "./TrainingPlan";
import { Level } from "./enums/Level"
import { WorkoutType } from "./enums/WorkoutType"

@Entity()
export class Workout {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
      type: "enum",
      enum: Level
    })
  level: Level;

  @Column({
    type: "enum",
    enum: WorkoutType
  })
  workout_type: WorkoutType;

  @Column("int")
  duration: number;

  @Column({ type: "varchar", length: 512, nullable: true })
  video: string;

  @Column("text")
  description: string;

  @Column("text")
  guide: string;

  @OneToMany(() => TrainingPlan, (plan) => plan.workout)
  trainingPlans: TrainingPlan[];
}
