import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { User } from './User';
import { Industry } from '../common/enums';
import {Vacancy} from "./Vacancy";

@Entity({ name: 'companies' })
export class Company extends BaseEntity {
    @Column({ unique: true })
    name!: string;

    @Column({ nullable: true, type: 'text' })
    description?: string;

    @Column({
        type: 'enum',
        enum: Industry,
        enumName: 'industry',
        default: Industry.Other,
    })
    industry!: Industry;

    @OneToMany(() => User, (u) => u.company)
    users!: User[];

    @OneToMany(() => Vacancy, (vacancy) => vacancy.company)
    vacancies!: Vacancy[];
}