import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ExerciseEntity } from "./exercise.entity";
import { FreeTrainingEntity } from "./free-training.entity";

@Entity("weapon_types")
export class WeaponTypeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => ExerciseEntity, exercise => exercise.weaponType)
    exercises: ExerciseEntity[];

    @OneToMany(() => FreeTrainingEntity, freeTraining => freeTraining.weaponType)
    free_trainings: FreeTrainingEntity[];
} 