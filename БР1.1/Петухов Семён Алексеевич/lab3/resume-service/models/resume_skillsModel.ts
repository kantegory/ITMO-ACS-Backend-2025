import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Resume } from "./resumeModel";

@Entity()
export class ResumeSkills {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Resume, (resume) => resume.resumeSkills, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: "resume_id" })
    resume!: Resume;

    @Column({ type: "int", name: "skill_id" })
    skillId!: number;
}
