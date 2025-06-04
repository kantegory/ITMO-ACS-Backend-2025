import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { FreeTraining } from "./FreeTraining";
import { Exercise } from "./Exercise";

@Entity({ name: "target" })
export class Target {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "blob", nullable: true })
  image!: Buffer | null;

  // Связь к FreeTraining
  @OneToMany(() => FreeTraining, (ft) => ft.target)
  freeTrainings!: FreeTraining[];

  // Связь к Exercise
  @OneToMany(() => Exercise, (ex) => ex.target)
  exercises!: Exercise[];
}
