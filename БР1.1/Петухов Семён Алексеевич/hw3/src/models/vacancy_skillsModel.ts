import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Vacancy } from "./vacancyModel";
import { Skill } from "./skillModel";

@Entity()
export class VacancySkills {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Vacancy, (vacancy) => vacancy.vacancySkills)
    vacancy: Vacancy;

    @ManyToOne(() => Skill, (skill) => skill.vacancySkills)
    skill: Skill;

    // Конструктор для инициализации всех свойств
    constructor(vacancy: Vacancy, skill: Skill) {
        this.vacancy = vacancy;
        this.skill = skill;
    }
}
