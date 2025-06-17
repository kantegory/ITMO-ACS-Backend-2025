import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class UserProgress {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.progress)
  user!: User;

  @Column()
  progress_date!: Date;

  @Column()
  weight!: number;

  @Column()
  completed_workouts!: number;
}