import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Company} from "./company.entity";
import {Application} from "./application.entity";

@Entity('vacancies')
export class Vacancy {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Company, company => company.vacancies)
    company: Company;

    @Column('varchar', { length: 255 })
    title: string;

    @Column('text')
    description: string;

    @Column('text')
    requirements: string;

    @Column('int', { nullable: true })
    salary?: number;

    @Column('int')
    industry: number;

    @Column('int')
    experience_level: number;

    @Column({ type: 'timestamp' })
    posted_date: Date;

    @OneToMany(() => Application, application => application.vacancy)
    applications: Application[];
}