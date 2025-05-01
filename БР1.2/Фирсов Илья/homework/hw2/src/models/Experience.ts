import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Resume } from './Resume';
import { Industry } from '../common/enums';

@Entity({ name: 'experiences' })
export class Experience extends BaseEntity {
    @Column()
    company!: string;

    @Column({
        type: 'enum',
        enum: Industry,
        enumName: 'industry',
        default: Industry.Other,
    })
    industry!: Industry;

    @Column()
    role!: string;

    @Column({ name: 'start_date', type: 'date' })
    startDate!: string;

    @Column({ name: 'end_date', type: 'date', nullable: true })
    endDate?: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @ManyToOne(() => Resume, (r) => r.experiences, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'resume_id' })
    resume!: Resume;
}
