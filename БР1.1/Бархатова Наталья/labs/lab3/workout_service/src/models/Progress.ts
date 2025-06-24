import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Progress {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Column("float")
  current_weight: number;

  @Column("int")
  workout_minutes: number;

  @Column("int")
  completed_workouts: number;
}
