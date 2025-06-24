import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Progress {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.progress)
  user: User;

  @Column("float")
  current_weight: number;

  @Column("int")
  workout_minutes: number;

  @Column("int")
  completed_workouts: number;
}
