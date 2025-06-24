import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Resume } from './Resume';
import { EducationDegree } from '../common/enums';

@Entity({ name: 'educations' })
export class Education extends BaseEntity {
    @ManyToOne(() => Resume, (r) => r.educations, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'resume_id' })
    resume!: Resume;

    @Column()
    institution!: string;

    @Column({
        type: 'enum',
        enum: EducationDegree,
        enumName: 'education_degree',
    })
    degree!: EducationDegree;

    @Column({ name: 'start_date', type: 'date' })
    startDate!: string;

    @Column({ name: 'end_date', type: 'date', nullable: true })
    endDate?: string;
}
