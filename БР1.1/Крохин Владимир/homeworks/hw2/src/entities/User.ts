import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from "typeorm";
import { Coach } from "./Coach";
import { Athlete } from "./Athlete";
import { Note } from "./Note";

@Entity({ name: "user" })
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  username!: string;

  @Column({ type: "varchar", length: 150 })
  email!: string;

  @Column({ type: "varchar", length: 255 })
  passwordHash!: string;

  @Column({ name: "first_name", type: "varchar", length: 100 })
  firstName!: string;

  @Column({ name: "second_name", type: "varchar", length: 100 })
  secondName!: string;

  @Column({ type: "blob", nullable: true })
  avatar!: Buffer | null;

  // Связь к Coach (если этот пользователь – тренер)
  @OneToMany(() => Coach, (coach) => coach.user)
  coachProfiles!: Coach[];

  // Связь к Athlete (если этот пользователь – спортсмен)
  @OneToMany(() => Athlete, (athlete) => athlete.user)
  athleteProfiles!: Athlete[];

  // Связь к Note (заметки этого пользователя)
  @OneToMany(() => Note, (note) => note.user)
  notes!: Note[];
}
