// src/entities/Resume.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Application } from "./Application";

@Entity()
export class Resume {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    experience!: string;

    @ManyToOne(() => User, (user) => user.resumes)
    user!: User;

    @OneToMany(() => Application, (application) => application.resume)
    applications!: Application[];
}
