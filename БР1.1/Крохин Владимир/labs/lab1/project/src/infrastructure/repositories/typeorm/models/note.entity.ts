import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { FreeTrainingEntity } from "./free-training.entity";
import { QualificationTrainingEntity } from "./qualification-training.entity";

@Entity("notes")
export class NoteEntity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: string;

    @ManyToOne(() => UserEntity, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user: UserEntity;

    @Column({ type: "int" })
    user_id: number;

    @ManyToOne(() => FreeTrainingEntity, free_training => free_training.notes)
    @JoinColumn({ name: "training_id" })
    training: FreeTrainingEntity;

    @ManyToOne(() => QualificationTrainingEntity, qualification => qualification.notes)
    @JoinColumn({ name: "training_id" })
    qualification: QualificationTrainingEntity;


    @Column({ type: "int" })
    training_id: number;

    @Column({ type: "datetime" })
    created_at: Date;

    @Column({ type: "datetime", nullable: true })
    edited_at: Date;

    @Column({ type: "text" })
    content: string;
} 