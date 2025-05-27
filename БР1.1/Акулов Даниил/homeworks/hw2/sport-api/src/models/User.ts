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
import {SessionExercise} from "./SessionExercise";
import {BlogPost} from "./BlogPost";
import {WorkoutSession} from "./WorkoutSession";
import {WorkoutPlan} from "./WorkoutPlan";
import {WorkoutPlanUserLink} from "./WorkoutPlanUserLink";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 256, unique: true})
    email: string;

    @Column({type: "varchar", length: 256})
    password: string;

    @Column({type: "varchar", length: 256, default: ''})
    avatarUrl: string;

    @Column({type: 'varchar', length: 256})
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => SessionExercise, sessionExercise => sessionExercise.user)
    sessionExercises: SessionExercise[];

    @OneToMany(() => WorkoutSession, workoutSession => workoutSession.user)
    workoutSessions: WorkoutSession[];

    @OneToMany(() => BlogPost, blogPost => blogPost.author)
    blogPosts: BlogPost[];

    @OneToMany(() => WorkoutPlan, workoutPlan => workoutPlan.user)
    workoutPlans: WorkoutPlan[];

    @OneToMany(() => WorkoutPlanUserLink, workoutPlanUserLinks => workoutPlanUserLinks.user)
    workoutPlanUserLinks: WorkoutPlanUserLink[];
}