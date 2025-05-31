import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Company } from "./companyModel";
import { VacancySkills } from "./vacancy_skillsModel";
import { Application } from "./applicationModel";
import { MotivationLetter } from "./motivation_letterModel";

@Entity()
export class Vacancy {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    title!: string;

    @Column({ type: "text", nullable: true })
    description?: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    industry?: string;

    @Column({ type: "text", nullable: true })
    requirements?: string;

    @Column({ type: "int", nullable: true })
    salary?: number;

    @Column({ type: "varchar", length: 255, nullable: true })
    work_exp?: string;

    @ManyToOne(() => Company, (company) => company.vacancies, { nullable: false })
    company!: Company;

    @OneToMany(() => VacancySkills, (vs) => vs.vacancy)
    vacancySkills?: VacancySkills[];

    @OneToMany(() => Application, (app) => app.vacancy)
    applications?: Application[];

    @OneToMany(() => MotivationLetter, (ml) => ml.vacancy)
    motivationLetters?: MotivationLetter[];
}
