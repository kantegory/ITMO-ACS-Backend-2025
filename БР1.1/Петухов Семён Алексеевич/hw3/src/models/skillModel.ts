import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ResumeSkills } from "./resume_skillsModel";
import { VacancySkills } from "./vacancy_skillsModel";

@Entity()
export class Skill {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    skill_name: string;

    @Column("text")
    description: string;

    @OneToMany(() => ResumeSkills, (rs) => rs.skill)
    resumeSkills?: ResumeSkills[];

    @OneToMany(() => VacancySkills, (vs) => vs.skill)
    vacancySkills?: VacancySkills[];

    // Конструктор для инициализации всех свойств
    constructor(
        skill_name: string,
        description: string
    ) {
        this.skill_name = skill_name;
        this.description = description;
    }
}
