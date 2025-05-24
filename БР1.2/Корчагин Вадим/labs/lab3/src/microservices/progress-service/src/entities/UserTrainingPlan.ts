import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"

@Entity("user_training_plan")
export class UserTrainingPlan {
  @PrimaryGeneratedColumn()
  id: number

  @Column("int")
  user_id: number

  @Column("int")
  training_plan_id: number

  @Column({ type: "date", nullable: true })
  started_at: Date

  @Column({ type: "date", nullable: true })
  ended_at: Date
}
