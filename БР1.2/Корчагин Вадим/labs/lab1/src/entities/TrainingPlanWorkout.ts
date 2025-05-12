import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { TrainingPlan } from "./TrainingPlan"
import { Workout } from "./Workout"

@Entity("training_plan_workouts")
export class TrainingPlanWorkout {
  @PrimaryGeneratedColumn()
  id: number

  @Column("int") 
  training_plan_id: number

  @ManyToOne(() => TrainingPlan, (tp) => tp.workouts)
  @JoinColumn({ name: "training_plan_id" })
  training_plan: TrainingPlan

  @Column("int") 
  workout_id: number


  @ManyToOne(() => Workout, (workout) => workout.planWorkouts)
  @JoinColumn({ name: "workout_id" })
  workout: Workout
}
