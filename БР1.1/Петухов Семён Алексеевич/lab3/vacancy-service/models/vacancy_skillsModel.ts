import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Vacancy } from "./vacancyModel";

@Entity()
export class VacancySkills {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Vacancy, (vacancy) => vacancy.VacansySkills, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: "vacancy_id" })
    vacancy!: Vacancy;

    @Column({ type: "int", name: "skill_id" })
    skillId!: number;
}
