import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Resume} from "./resume.entity";

@Entity('educations')
export class Education {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Resume, resume => resume.educations)
    @JoinColumn({ name: 'resume_id' })
    resume: Resume;

    @Column('varchar', { length: 255 }) 
    institute: string;

    @Column('varchar', { length: 255, nullable: true })
    degree?: string;

    @Column('varchar', { length: 255, nullable: true })
    specialization?: string;

    @Column({ type: 'date' })
    start_date: string;

    @Column({ type: 'date', nullable: true })
    end_date?: string;
}