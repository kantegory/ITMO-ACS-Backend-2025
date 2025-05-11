import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Resume } from "./resumeModel";

@Entity()
export class Education {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    education_level: string;

    @OneToMany(() => Resume, (resume) => resume.education)
    resumes?: Resume[];

    // Конструктор для инициализации полей
    constructor(education_level: string) {
        this.education_level = education_level;
    }
}
