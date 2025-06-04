import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Training } from "./Training";
import { Shot } from "./Shot";
import { SeriesNote } from "./SeriesNote";

@Entity({ name: "series" })
export class Series {
  @PrimaryGeneratedColumn({ })
  id!: number;

  @ManyToOne(() => Training, (tr) => tr.series, { onDelete: "CASCADE" })
  training!: Training;

  @Column({ name: "begin_time_offset", type: "smallint" })
  beginTimeOffset!: number;

  @Column({ name: "end_time_offset", type: "smallint", nullable: true })
  endTimeOffset!: number | null;

  // Связь к Shot
  @OneToMany(() => Shot, (shot) => shot.series)
  shots!: Shot[];

  // Связь к SeriesNote
  @OneToMany(() => SeriesNote, (sn) => sn.series)
  seriesNotes!: SeriesNote[];
}
