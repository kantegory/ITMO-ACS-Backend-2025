import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { NoteEntity } from "./note.entity";
import { SeriesEntity } from "./series.entity";

@Entity("series_notes")
export class SeriesNotesEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: string;

    @ManyToOne(() => NoteEntity, { onDelete: "CASCADE" })
    @JoinColumn({ name: "note_id" })
    note: NoteEntity;

    @Column({ type: "bigint" })
    note_id: string;

    @ManyToOne(() => SeriesEntity, { onDelete: "CASCADE" })
    @JoinColumn({ name: "series_id" })
    series: SeriesEntity;

    @Column({ type: "bigint" })
    series_id: string;
} 