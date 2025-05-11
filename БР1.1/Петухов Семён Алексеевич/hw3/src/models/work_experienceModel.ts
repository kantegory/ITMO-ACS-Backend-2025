import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Resume } from "./resumeModel";

@Entity()
export class WorkExperience {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Resume, (resume) => resume.experiences)
    resume: Resume;

    @Column()
    company: string;

    @Column()
    role: string;

    @Column("text")
    description: string;

    @Column()
    duration: string;

    // Конструктор для инициализации всех свойств
    constructor(
        company: string,
        role: string,
        description: string,
        duration: string,
        resume: Resume
    ) {
        this.company = company;
        this.role = role;
        this.description = description;
        this.duration = duration;
        this.resume = resume; // Обязательное поле связи с Resume
    }
}
