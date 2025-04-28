import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Resume } from './Resume';

@Entity({ name: 'work_experiences' })
export class WorkExperience extends BaseEntity {
    @ManyToOne(() => Resume, (r) => r.experiences, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'resume_id' })
    resume!: Resume;

    @Column()
    company!: string;

    @Column()
    title!: string;

    @Column({ name: 'start_date', type: 'date' })
    startDate!: string;

    @Column({ name: 'end_date', type: 'date', nullable: true })
    endDate?: string;

    @Column({ type: 'text', nullable: true })
    description?: string;
}
