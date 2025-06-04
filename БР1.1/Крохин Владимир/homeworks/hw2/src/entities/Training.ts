import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Athlete } from "./Athlete";
import { FreeTraining } from "./FreeTraining";
import { QualificationTraining } from "./QualificationTraining";
import { Series } from "./Series";
import { TrainingNote } from "./TrainingNote";

@Entity({ name: "training" })
export class Training {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Athlete, (athlete) => athlete.trainings, { onDelete: "CASCADE" })
  athlete!: Athlete;

  @Column({ name: "start_ts", type: "datetime" })
  startTs!: Date;

  @Column({ name: "end_ts", type: "datetime", nullable: true })
  endTs!: Date | null;

  // Полиморфные подтипы определяем ниже
  @OneToOne(() => FreeTraining, (ft) => ft.training)
  freeTrainingProfile!: FreeTraining | null;

  @OneToOne(
    () => QualificationTraining,
    (qt) => qt.training
  )
  qualificationTrainingProfile!: QualificationTraining | null;

  // Связь к Series
  @OneToMany(() => Series, (series) => series.training)
  series!: Series[];

  // Связь к заметкам через промежуточную таблицу
  @OneToMany(() => TrainingNote, (tn) => tn.training)
  trainingNotes!: TrainingNote[];

  @Column({ name: "total_score", type: "smallint", default: 0 })
  totalScore!: number;
}
