import {
    Entity,
    Column,
    ManyToOne,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Vacancy } from './Vacancy';
import { User } from './User';
import { Interview } from './Interview';
import { ApplicationStatus } from '../common/enums';

@Entity({ name: 'applications' })
export class Application extends BaseEntity {
    @Column({ type: 'text', nullable: true })
    coverLetter?: string;

    @Column({
        type: 'enum',
        enum: ApplicationStatus,
        enumName: 'application_status',
        default: ApplicationStatus.Applied,
    })
    status!: ApplicationStatus;

    @Column({ name: 'applied_date', type: 'timestamptz' })
    appliedDate!: Date;

    @ManyToOne(() => Vacancy, (v) => v.applications, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'vacancy_id' })
    vacancy!: Vacancy;

    @ManyToOne(() => User, (u) => u.applications, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @OneToOne(() => Interview, (i) => i.application, { cascade: true })
    interview?: Interview;
}