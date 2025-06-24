import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
  } from "typeorm";
  import { User } from "./User";
  import { Workout } from "./Workout";
  
  @Entity()
  export class TrainingPlan {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @ManyToOne(() => User, (user) => user.trainingPlans)
    user: User;
  
    @ManyToOne(() => Workout, (workout) => workout.trainingPlans)
    workout: Workout;
  
    @Column({ type: "bool", default: false })
    completed: boolean;
  
    @Column({ type: "timestamp" })
    scheduled_date: Date;
  
    @Column("int")
    difficulty_grade: number;
  }
  