import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { WorkoutPlan } from "./WorkoutPlan";

@Entity()
export class Plan {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column("text")
  description!: string;

  @ManyToOne(() => User, (user) => user.plans)
  user!: User;

  @Column()
  start_date!: Date;

  @Column()
  end_date!: Date;

  @OneToMany(() => WorkoutPlan, (plan) => plan.plan)
  workoutPlans!: WorkoutPlan[];
}