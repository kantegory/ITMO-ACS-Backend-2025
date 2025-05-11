import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Company } from "./companyModel";
import { VacancySkills } from "./vacancy_skillsModel";
import { Application } from "./applicationModel";
import { MotivationLetter } from "./motivation_letterModel";

@Entity()
export class Vacancy {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title: string;

    @Column("text")
    description: string;

    @Column()
    industry: string;

    @Column("text")
    requirements: string;

    @Column()
    salary: number;

    @Column()
    work_exp: string;

    @ManyToOne(() => Company, (company) => company.vacancies)
    company: Company;

    @OneToMany(() => VacancySkills, (vs) => vs.vacancy)
    vacancySkills?: VacancySkills[];

    @OneToMany(() => Application, (app) => app.vacancy)
    applications?: Application[];

    @OneToMany(() => MotivationLetter, (ml) => ml.vacancy)
    motivationLetters?: MotivationLetter[];

    // Конструктор для инициализации всех свойств
    constructor(
        title: string,
        description: string,
        industry: string,
        requirements: string,
        salary: number,
        work_exp: string,
        company: Company
    ) {
        this.title = title;
        this.description = description;
        this.industry = industry;
        this.requirements = requirements;
        this.salary = salary;
        this.work_exp = work_exp;
        this.company = company;
    }
}
