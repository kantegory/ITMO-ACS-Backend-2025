import {Entity, Column, ManyToOne, CreateDateColumn, PrimaryGeneratedColumn} from 'typeorm';
import { WorkoutPlan } from './WorkoutPlan';

@Entity('workout_plan_user_links')
export class WorkoutPlanUserLink {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    workoutPlanId: number;

    @ManyToOne(() => WorkoutPlan, workoutPlan => workoutPlan.workoutPlanUserLinks)
    workoutPlan: WorkoutPlan;

    @Column({ type: 'timestamp', nullable: true })
    planedAt: Date;

    @CreateDateColumn()
    createdAt: Date;
}
