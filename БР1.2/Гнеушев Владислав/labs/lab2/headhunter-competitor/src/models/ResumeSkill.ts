import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Resume } from "./Resume"
import { Skill } from "./Skill"

@Entity()
export class ResumeSkill {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Skill, skill => skill.resumeSkills)
    skill: Skill

    @ManyToOne(() => Resume, resume => resume.skills)
    resume: Resume
} 