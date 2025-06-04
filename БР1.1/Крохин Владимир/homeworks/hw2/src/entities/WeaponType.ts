import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { FreeTraining } from "./FreeTraining";
import { Exercise } from "./Exercise";

@Entity({ name: "weapon_type" })
export class WeaponType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 50 })
  name!: string;

  // Связь к FreeTraining
  @OneToMany(() => FreeTraining, (ft) => ft.weaponType)
  freeTrainings!: FreeTraining[];

  // Связь к Exercise
  @OneToMany(() => Exercise, (ex) => ex.weaponType)
  exercises!: Exercise[];
}
