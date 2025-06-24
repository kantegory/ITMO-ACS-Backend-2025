import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Resume } from './Resume';
import { EducationDegree } from '../common/enums';

@Entity({ name: 'educations' })
export class Education extends BaseEntity {
    @Column()
    institution!: string;

    @Column({
        type: 'enum',
        enum: EducationDegree,
        enumName: 'education_degree',
    })
    degree!: EducationDegree;

    @Column({ name: 'field_of_study' })
    fieldOfStudy!: string;

    @Column({ name: 'start_date', type: 'date' })
    startDate!: string;

    @Column({ name: 'end_date', type: 'date', nullable: true })
    endDate?: string;

    @ManyToOne(() => Resume, (r) => r.educations, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'resume_id' })
    resume!: Resume;
}