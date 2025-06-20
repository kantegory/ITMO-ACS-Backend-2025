// src/entities/Employer.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Job } from "./Job";

@Entity()
export class Employer {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    companyName!: string;

    @ManyToOne(() => User, (user) => user.employers)
    user!: User;

    @OneToMany(() => Job, (job) => job.employer)
    jobs!: Job[];
}
