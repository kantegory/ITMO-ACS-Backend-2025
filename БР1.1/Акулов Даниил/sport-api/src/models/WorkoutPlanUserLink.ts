import {Entity, Column, ManyToOne, CreateDateColumn, PrimaryGeneratedColumn} from 'typeorm';
import { User } from './User';
import { WorkoutPlan } from './WorkoutPlan';

@Entity('workout_plan_user_links')
export class WorkoutPlanUserLink {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @ManyToOne(() => User, user => user.workoutPlanUserLinks)
    user: User;

    @Column()
    workoutPlanId: number;

    @ManyToOne(() => WorkoutPlan, workoutPlan => workoutPlan.workoutPlanUserLinks)
    workoutPlan: WorkoutPlan;

    @Column({ type: 'timestamp', nullable: true })
    planedAt: Date;

    @CreateDateColumn()
    createdAt: Date;
}
