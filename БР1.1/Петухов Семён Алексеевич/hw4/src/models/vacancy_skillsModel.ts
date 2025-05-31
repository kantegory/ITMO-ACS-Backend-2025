import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from "typeorm";
import { Vacancy } from "./vacancyModel";
import { Skill } from "./skillModel";

@Entity()
@Unique(["vacancy", "skill"]) // предотвращаем дублирование навыков для вакансии
export class VacancySkills {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Vacancy, (vacancy) => vacancy.vacancySkills, { nullable: false })
    vacancy!: Vacancy;

    @ManyToOne(() => Skill, (skill) => skill.vacancySkills, { nullable: false })
    skill!: Skill;
}
