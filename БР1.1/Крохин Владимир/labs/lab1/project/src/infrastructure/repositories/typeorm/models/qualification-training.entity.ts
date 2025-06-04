import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { ExerciseEntity } from "./exercise.entity";
import { SeriesEntity } from "./series.entity";
import { NoteEntity } from "./note.entity";

@Entity("qualification_trainings")
export class QualificationTrainingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "start_time_stamp" })
    startTimeStamp: Date;

    @Column({ name: "end_time_stamp", nullable: true })
    endTimeStamp: Date | null;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: "athlete_id" })
    athlete: UserEntity;

    @ManyToOne(() => ExerciseEntity)
    @JoinColumn({ name: "exercise_id" })
    exercise: ExerciseEntity;

    @OneToMany(() => SeriesEntity, series => series.training)
    series: SeriesEntity[];

    @OneToMany(() => NoteEntity, note => note.training)
    notes: NoteEntity[];
} 