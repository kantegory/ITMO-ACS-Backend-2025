import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Company } from './Company';
import { EmployerProfile } from './EmployerProfile';
import { VacancySkill } from './VacancySkill';
import { Application } from './Application';
import { Industry } from '../common/enums';

@Entity({ name: 'vacancies' })
export class Vacancy extends BaseEntity {
    @ManyToOne(() => Company, (c) => c.vacancies, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'company_id' })
    company!: Company;

    @ManyToOne(() => EmployerProfile, (ep) => ep.id, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'employer_profile_id' })
    employerProfile!: EmployerProfile;

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

    @OneToMany(() => VacancySkill, (vs) => vs.vacancy, { cascade: true })
    vacancySkills!: VacancySkill[];

    @OneToMany(() => Application, (app) => app.vacancy, { cascade: true })
    applications!: Application[];
}
