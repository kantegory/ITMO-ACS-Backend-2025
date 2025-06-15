import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Resume} from "./resume.entity";

@Entity('skills')
export class Skill {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Resume, (resume) => resume.skills)
    @JoinColumn({name: 'resume_id'})
    resume: Resume;

    @Column('varchar', {length: 255})
    skill_name: string;
}