import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Coach } from "./Coach";
import { Training } from "./Training";

@Entity({ name: "athlete" })
export class Athlete {
  @PrimaryGeneratedColumn()
  id!: number;

  // Каждый Athlete связан с одним User
  @ManyToOne(() => User, (user) => user.athleteProfiles, { onDelete: "CASCADE" })
  user!: User;

  // Many-to-Many: спортсмен может иметь много тренеров
  @ManyToMany(() => Coach, (coach) => coach.athletes)
  coaches!: Coach[];

  // One-to-Many: спортсмен - много тренировок
  @OneToMany(() => Training, (training) => training.athlete)
  trainings!: Training[];
}
