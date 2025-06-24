import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SessionExercise } from './SessionExercise';

@Entity('exercise_types')
export class ExerciseType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'text', nullable: true })
    muscleGroup: string;

    @OneToMany(() => SessionExercise, sessionExercise => sessionExercise.exerciseType)
    sessionExercises: SessionExercise[];
}