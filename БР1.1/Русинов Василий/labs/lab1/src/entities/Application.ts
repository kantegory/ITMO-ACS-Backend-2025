// src/entities/Application.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Resume } from "./Resume";
import { Job } from "./Job";
import { User } from "./User";

@Entity()
export class Application {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    status!: string;

    @ManyToOne(() => User, (user) => user.applications)
    user!: User;

    @ManyToOne(() => Resume, (resume) => resume.applications)
    resume!: Resume;

    @ManyToOne(() => Job, (job) => job.applications)
    job!: Job;
}
