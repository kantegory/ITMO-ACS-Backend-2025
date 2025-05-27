import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne
} from "typeorm";
import {User} from "./User";
import {ExerciseType} from "./ExerciseType";
import {WorkoutSession} from "./WorkoutSession";

@Entity('session_exercises')
export class SessionExercise {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 256, nullable: true })
    weight: string;

    @Column({ type: 'varchar', length: 256, nullable: true })
    count: string;

    @Column({ type: 'time', nullable: true })
    time: Date;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column()
    userId: number;

    @ManyToOne(() => User, user => user.sessionExercises)
    user: User;

    @Column()
    sessionId: number;

    @ManyToOne(() => WorkoutSession, workoutSession => workoutSession.sessionExercises)
    workoutSession: WorkoutSession;

    @Column()
    exerciseTypeId: number;

    @ManyToOne(() => ExerciseType, exerciseType => exerciseType.sessionExercises)
    exerciseType: ExerciseType;
}