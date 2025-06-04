import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Series } from "./Series";
import { Note } from "./Note";

@Entity({ name: "series_notes" })
export class SeriesNote {
  @PrimaryGeneratedColumn({ })
  id!: number;

  @ManyToOne(() => Note, (note) => note.seriesNotes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "note_id" })
  note!: Note;

  @ManyToOne(() => Series, (series) => series.seriesNotes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "series_id" })
  series!: Series;
}
