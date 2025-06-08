// src/entities/Industry.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Job } from "./Job";

@Entity()
export class Industry {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @ManyToMany(() => Job, (job) => job.industries)
    jobs!: Job[];
}
