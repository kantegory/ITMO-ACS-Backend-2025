import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ExerciseEntity } from "./exercise.entity";
import { FreeTrainingEntity } from "./free-training.entity";

@Entity("targets")
export class TargetEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @Column({ type: "bytea", nullable: true })
    image: Buffer;

    @OneToMany(() => ExerciseEntity, exercise => exercise.target)
    exercises: ExerciseEntity[];

    @OneToMany(() => FreeTrainingEntity, freeTraining => freeTraining.target)
    free_trainings: FreeTrainingEntity[];
} 