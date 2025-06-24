import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';
import {WorkoutPlanUserLink} from "./WorkoutPlanUserLink";

@Entity('workout_plans')
export class WorkoutPlan {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 256 })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'text', nullable: true })
    content: string;

    @Column({
        type: 'enum',
        enum: ['cardio', 'strength'],
    })
    type: 'cardio' | 'strength';

    @Column({ type: 'int' })
    level: number;

    @Column({ type: 'timestamp', nullable: true })
    duration: Date;

    @Column({ type: 'varchar', length: 256, nullable: true })
    videoUrl: string;

    @Column()
    userId: number;

    @OneToMany(() => WorkoutPlanUserLink, workoutPlanUserLinks => workoutPlanUserLinks.workoutPlan)
    workoutPlanUserLinks: WorkoutPlanUserLink[];
}
