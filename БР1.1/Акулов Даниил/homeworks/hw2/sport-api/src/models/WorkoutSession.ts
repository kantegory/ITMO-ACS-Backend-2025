import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';
import { User } from './User';
import {SessionExercise} from "./SessionExercise";

@Entity('workout_sessions')
export class WorkoutSession {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 256 })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({
        type: 'enum',
        enum: ['cardio', 'strength'],
    })
    type: 'cardio' | 'strength';

    @Column({ type: 'timestamp', nullable: true })
    startedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    endedAt: Date;

    @Column()
    userId: number;

    @ManyToOne(() => User, user => user.workoutSessions)
    user: User;

    @OneToMany(() => SessionExercise, sessionExercise => sessionExercise.workoutSession)
    sessionExercises: SessionExercise[];
}
