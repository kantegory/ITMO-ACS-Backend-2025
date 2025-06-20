// src/entities/Employer.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Job } from "./Job";

@Entity()
export class Employer {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    companyName!: string;

    @OneToMany(() => Job, (job) => job.employer)
    jobs!: Job[];

    @Column()
    user_id!: number;
}
