import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { NoteEntity } from "./note.entity";
import { TrainingEntity } from "./training.entity";

@Entity("training_notes")
export class TrainingNotesEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @ManyToOne(() => NoteEntity, { onDelete: "CASCADE" })
    @JoinColumn({ name: "note_id" })
    note: NoteEntity;

    @Column({ type: "bigint" })
    note_id: string;

    @ManyToOne(() => TrainingEntity, { onDelete: "CASCADE" })
    @JoinColumn({ name: "training_id" })
    training: TrainingEntity;

    @Column({ type: "int" })
    training_id: number;
} 