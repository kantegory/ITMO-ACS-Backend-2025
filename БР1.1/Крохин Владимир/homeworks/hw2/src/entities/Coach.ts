import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Athlete } from "./Athlete";

@Entity({ name: "coach" })
export class Coach {
  @PrimaryGeneratedColumn()
  id!: number;

  // Каждый Coach связан с одним User
  @ManyToOne(() => User, (user) => user.coachProfiles, { onDelete: "CASCADE" })
  user!: User;

  // Many-to-Many: тренер может иметь много спортсменов
  @ManyToMany(() => Athlete, (athlete) => athlete.coaches)
  @JoinTable({
    name: "athlete_coach",
    joinColumn: { name: "coach_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "athlete_id", referencedColumnName: "id" },
  })
  athletes!: Athlete[];
}
