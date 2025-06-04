import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Training } from "./Training";
import { WeaponType } from "./WeaponType";
import { Target } from "./Target";

@Entity({ name: "free_training" })
export class FreeTraining {
  @PrimaryGeneratedColumn()
  id!: number;

  // Каждый FreeTraining ― это один Training
  @OneToOne(() => Training, (tr) => tr.freeTrainingProfile, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "training_id" })
  training!: Training;

  @ManyToOne(() => WeaponType, (wt) => wt.freeTrainings, { onDelete: "RESTRICT" })
  weaponType!: WeaponType;

  @ManyToOne(() => Target, (t) => t.freeTrainings, { onDelete: "RESTRICT" })
  target!: Target;
}
