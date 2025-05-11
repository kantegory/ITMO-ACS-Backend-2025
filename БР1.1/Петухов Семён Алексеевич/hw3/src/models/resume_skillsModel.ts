import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Resume } from "./resumeModel";
import { Skill } from "./skillModel";

@Entity()
export class ResumeSkills {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Resume, (resume) => resume.resumeSkills)
    resume: Resume;

    @ManyToOne(() => Skill, (skill) => skill.resumeSkills)
    skill: Skill;

    // Конструктор для инициализации связей
    constructor(resume: Resume, skill: Skill) {
        this.resume = resume;
        this.skill = skill;
    }
}
