// src/entities/Resume.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";

import { Application } from "./Application";

@Entity()
export class Resume {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    experience!: string;

    @OneToMany(() => Application, (application) => application.resume)
    applications!: Application[];

    @Column()
    user_id!: number;
}
