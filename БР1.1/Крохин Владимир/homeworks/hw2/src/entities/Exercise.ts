import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { WeaponType } from "./WeaponType";
import { Target } from "./Target";
import { QualificationTraining } from "./QualificationTraining";

@Entity({ name: "exercise" })
export class Exercise {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => WeaponType, (wt) => wt.exercises, { onDelete: "RESTRICT" })
  weaponType!: WeaponType;

  @ManyToOne(() => Target, (t) => t.exercises, { onDelete: "RESTRICT" })
  target!: Target;

  @Column({ type: "smallint" })
  shots!: number;

  @Column({ name: "shots_in_series", type: "smallint" })
  shotsInSeries!: number;

  @Column({ type: "smallint" })
  duration!: number;

  @Column({ type: "text" })
  description!: string;

  // Связь к QualificationTraining
  @OneToMany(() => QualificationTraining, (qt) => qt.exercise)
  qualificationTrainings!: QualificationTraining[];
}
