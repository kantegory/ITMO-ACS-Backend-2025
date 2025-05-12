import {
    Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
    OneToMany
  } from "typeorm"
  import { TrainingPlanWorkout } from "./TrainingPlanWorkout"
  
  @Entity("workouts")
  export class Workout {
    @PrimaryGeneratedColumn()
    id: number
  
    @Column("varchar", { length: 255 }) 
    title: string
    
    @Column("text", { nullable: true }) 
    description: string

    @Column("text", { nullable: true }) 
    video_url: string
  
    @Column("varchar", { length: 50 }) 
    level: string
    
    @Column("varchar", { length: 50 }) 
    workout_type: string

    @Column("int") 
    duration_min: number
  
    @Column("text", { nullable: true })
    instructions: string
  
    @CreateDateColumn()
    created_at: Date
  
    @UpdateDateColumn()
    updated_at: Date
  
    @OneToMany(() => TrainingPlanWorkout, (tpw) => tpw.workout)
    planWorkouts: TrainingPlanWorkout[]
  }
  