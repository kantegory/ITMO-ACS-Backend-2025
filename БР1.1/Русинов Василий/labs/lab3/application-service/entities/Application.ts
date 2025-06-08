// src/entities/Application.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Resume } from "./Resume";


@Entity()
export class Application {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    status!: string;

    @Column()
    user_id!: number;

    @ManyToOne(() => Resume, (resume) => resume.applications)
    resume!: Resume;

    @Column()
    job_id!: number;

}
