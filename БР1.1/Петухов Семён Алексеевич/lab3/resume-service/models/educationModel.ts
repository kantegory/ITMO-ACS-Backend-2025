import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Resume } from "./resumeModel";

@Entity()
export class Education {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    education_level!: string;

    @OneToMany(() => Resume, (resume) => resume.education)
    resumes?: Resume[];
}
