import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Vacancy } from './Vacancy';
import { Resume } from './Resume';
import { ApplicationStatus } from '../common/enums';

@Entity({ name: 'applications' })
export class Application extends BaseEntity {
    @ManyToOne(() => Vacancy, (v) => v.applications, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'vacancy_id' })
    vacancy!: Vacancy;

    @ManyToOne(() => Resume, (r) => r.applications, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'resume_id' })
    resume!: Resume;

    @Column({
        type: 'enum',
        enum: ApplicationStatus,
        enumName: 'application_status',
        default: ApplicationStatus.Applied,
    })
    status!: ApplicationStatus;

    @Column({ name: 'applied_date', type: 'timestamptz' })
    appliedDate!: Date;

    @Column({ name: 'cv_text', type: 'text', nullable: true })
    cvText?: string;
}
