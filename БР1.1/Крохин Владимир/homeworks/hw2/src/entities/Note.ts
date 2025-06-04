import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { TrainingNote } from "./TrainingNote";
import { SeriesNote } from "./SeriesNote";

@Entity({ name: "note" })
export class Note {
  @PrimaryGeneratedColumn({ })
  id!: number;

  @ManyToOne(() => User, (user) => user.notes, { onDelete: "CASCADE" })
  user!: User;

  @Column({ name: "created_at", type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column({ name: "edited_at", type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  editedAt!: Date;

  @Column({ type: "text" })
  content!: string;

  // Связи к TrainingNote
  @OneToMany(() => TrainingNote, (tn) => tn.note)
  trainingNotes!: TrainingNote[];

  // Связи к SeriesNote
  @OneToMany(() => SeriesNote, (sn) => sn.note)
  seriesNotes!: SeriesNote[];
}
