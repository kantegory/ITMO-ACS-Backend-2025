import {
    Entity,
    Column,
    OneToMany,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { EmployerProfile } from './EmployerProfile';
import { Vacancy } from './Vacancy';
import { Industry } from '../common/enums';

@Entity({ name: 'companies' })
export class Company extends BaseEntity {
    @Column({ unique: true })
    name!: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({
        type: 'enum',
        enum: Industry,
        enumName: 'industry',
        default: Industry.Other,
    })
    industry!: Industry;

    @Column({ nullable: true })
    website?: string;

    @Column({ nullable: true })
    address?: string;

    @Column({ nullable: true })
    phone?: string;

    @Column({ nullable: true })
    email?: string;

    @Column({ name: 'founded_date', type: 'date', nullable: true })
    foundedDate?: string;

    @Column({ name: 'employees_count', type: 'integer', nullable: true })
    employeesCount?: number;

    @OneToMany(() => EmployerProfile, (ep) => ep.company)
    employerProfiles!: EmployerProfile[];

    @OneToMany(() => Vacancy, (v) => v.company)
    vacancies!: Vacancy[];
}
