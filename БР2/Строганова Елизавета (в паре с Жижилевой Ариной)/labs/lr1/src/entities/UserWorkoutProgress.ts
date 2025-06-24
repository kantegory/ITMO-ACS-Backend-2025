import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Workout } from "./Workout";

@Entity()
export class UserWorkoutProgress {
  @PrimaryGeneratedColumn()
  progress_id!: number;

  @ManyToOne(() => User, (user) => user.workoutProgress)
  user!: User;

  @ManyToOne(() => Workout, (workout) => workout.userWorkoutProgresses)
  workout!: Workout;

  @Column()
  date!: Date;

  @Column()
  status!: string;

  @Column({ nullable: true })
  notes!: string;
}
