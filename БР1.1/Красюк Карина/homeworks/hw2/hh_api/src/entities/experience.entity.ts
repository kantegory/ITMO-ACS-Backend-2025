import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Resume} from "./resume.entity";

@Entity('experiences')
export class Experience {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Resume, (resume) => resume.experiences)
    @JoinColumn({ name: 'resume_id' })
    resume_id: string;

    @Column('varchar', { length: 255 })
    title: string;

    @Column('varchar', { length: 255, nullable: true })
    company?: string;

    @Column({ type: 'date' })
    start_date: string;

    @Column({ type: 'date', nullable: true })
    end_date?: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @ManyToOne(() => Resume, resume => resume.experiences)
    resume: Resume;
}