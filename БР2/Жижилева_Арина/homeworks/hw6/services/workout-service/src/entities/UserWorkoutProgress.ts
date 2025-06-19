import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Workout } from "./Workout";

@Entity()
export class UserWorkoutProgress {
  @PrimaryGeneratedColumn()
  progress_id!: number;

  @Column()
  date!: Date;

  @Column()
  status!: string;

  @Column({ nullable: true })
  notes!: string;
}
