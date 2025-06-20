import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Resume } from "./Resume";
import { Employer } from "./Employer";
import { Application } from "./Application";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column()
    name!: string;

    @Column()
    password!: string;

    @OneToMany(() => Resume, (resume) => resume.user)
    resumes!: Resume[];

    @OneToMany(() => Employer, (employer) => employer.user)
    employers!: Employer[];

    @OneToMany(() => Application, (application) => application.user)
    applications!: Application[];
}
