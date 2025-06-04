import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Training } from "./Training";
import { Note } from "./Note";

@Entity({ name: "training_notes" })
export class TrainingNote {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Note, (note) => note.trainingNotes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "note_id" })
  note!: Note;

  @ManyToOne(() => Training, (tr) => tr.trainingNotes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "training_id" })
  training!: Training;
}
