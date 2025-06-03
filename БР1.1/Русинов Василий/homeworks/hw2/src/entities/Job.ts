// src/entities/Job.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Employer } from "./Employer";
import { Application } from "./Application";
import { Industry } from "./Industry";

@Entity()
export class Job {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @ManyToOne(() => Employer, (employer) => employer.jobs)
    employer!: Employer;

    @OneToMany(() => Application, (application) => application.job)
    applications!: Application[];

    @ManyToMany(() => Industry, (industry) => industry.jobs)
    @JoinTable()
    industries!: Industry[];
}
