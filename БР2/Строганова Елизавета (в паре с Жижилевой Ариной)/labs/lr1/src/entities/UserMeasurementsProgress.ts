import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class UserMeasurementsProgress {
  @PrimaryGeneratedColumn()
  measurments_id!: number; // (да, в оригинале опечатка, можешь исправить на measurements_id если хочешь)

  @ManyToOne(() => User, (user) => user.measurementsProgress)
  user!: User;

  @Column("float")
  weight!: number;

  @Column("float")
  height!: number;

  @Column()
  date!: Date;

  @Column({ nullable: true })
  notes!: string;
}
