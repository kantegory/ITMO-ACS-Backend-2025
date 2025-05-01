import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Application } from './Application';
import { InterviewStatus } from '../common/enums';

@Entity({ name: 'interviews' })
export class Interview extends BaseEntity {
    @Column({ name: 'scheduled_date', type: 'timestamptz' })
    scheduledDate!: Date;

    @Column({ name: 'scheduled_location' })
    scheduledLocation!: string;

    @Column({ nullable: true })
    link?: string;

    @Column({
        type: 'enum',
        enum: InterviewStatus,
        enumName: 'interview_status',
        default: InterviewStatus.Planned,
    })
    status!: InterviewStatus;

    @Column({ name: 'confirmed_by_employer', default: false })
    confirmedByEmployer!: boolean;

    @Column({ name: 'confirmed_by_candidate', default: false })
    confirmedByCandidate!: boolean;

    @Column({ name: 'employer_feedback', type: 'text', nullable: true })
    employerFeedback?: string;

    @Column({ name: 'candidate_feedback', type: 'text', nullable: true })
    candidateFeedback?: string;

    @OneToOne(() => Application, (app) => app.interview, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'application_id' })
    application!: Application;
}