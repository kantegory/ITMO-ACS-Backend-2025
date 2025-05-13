import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  OneToMany
} from "typeorm"
import { TrainingPlanWorkout } from "./TrainingPlanWorkout"

@Entity("training_plans")
export class TrainingPlan {
  @PrimaryGeneratedColumn()
  id: number

  @Column("varchar", { length: 255 }) 
  plan_name: string

  @Column("text", { nullable: true })
  description: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @OneToMany(() => TrainingPlanWorkout, (tpw) => tpw.training_plan)
  workouts: TrainingPlanWorkout[]
}