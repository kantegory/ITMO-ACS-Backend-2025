import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./User"
import { TrainingPlan } from "./TrainingPlan"

@Entity("user_training_plan")
export class UserTrainingPlan {
  @PrimaryGeneratedColumn()
  id: number

  @Column("int")
  user_id: number

  @ManyToOne(() => User, (user) => user.trainingPlans)
  @JoinColumn({ name: "user_id" })
  user: User

  @Column("int")
  training_plan_id: number

  @ManyToOne(() => TrainingPlan, (tp) => tp.users)
  @JoinColumn({ name: "training_plan_id" })
  training_plan: TrainingPlan

  @Column({ type: "date", nullable: true })
  started_at: Date

  @Column({ type: "date", nullable: true })
  ended_at: Date
}
