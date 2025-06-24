import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Company } from './Company';
import { User } from './User';
import { VacancySkill } from './VacancySkill';
import { Application } from './Application';
import { Industry } from '../common/enums';

@Entity({ name: 'vacancies' })
export class Vacancy extends BaseEntity {
    @Column()
    title!: string;

    @Column({ type: 'text' })
    description!: string;

    @Column({ type: 'text', nullable: true })
    requirements?: string;

    @Column({ name: 'salary_min', type: 'numeric', nullable: true })
    salaryMin?: number;

    @Column({ name: 'salary_max', type: 'numeric', nullable: true })
    salaryMax?: number;

    @Column({
        type: 'enum',
        enum: Industry,
        enumName: 'industry',
        default: Industry.Other,
    })
    industry!: Industry;

    @Column({ name: 'experience_required', type: 'integer', nullable: true })
    experienceRequired?: number;

    @Column({ name: 'posted_date', type: 'timestamptz' })
    postedDate!: Date;

    @Column({ name: 'expire_date', type: 'timestamptz', nullable: true })
    expireDate?: Date;

    @ManyToOne(() => Company, (c) => c.vacancies, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'company_id' })
    company!: Company;

    @ManyToOne(() => User, (u) => u.vacancies, { nullable: false })
    @JoinColumn({ name: 'employer_id' })
    employer!: User;

    @OneToMany(() => VacancySkill, (vs) => vs.vacancy)
    vacancySkills!: VacancySkill[];

    @OneToMany(() => Application, (app) => app.vacancy)
    applications!: Application[];
}
