import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Training } from "./Training";
import { Exercise } from "./Exercise";

@Entity({ name: "qualification_training" })
export class QualificationTraining {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Training, (tr) => tr.qualificationTrainingProfile, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "training_id" })
  training!: Training;

  @ManyToOne(() => Exercise, (ex) => ex.qualificationTrainings, {
    onDelete: "RESTRICT",
  })
  exercise!: Exercise;
}
