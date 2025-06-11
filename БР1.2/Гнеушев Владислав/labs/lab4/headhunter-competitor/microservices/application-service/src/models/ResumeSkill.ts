import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm"
import { Resume } from "./Resume"

@Entity()
export class ResumeSkill {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    skillId!: number

    @Column({ length: 128 })
    skillName!: string 

    @Column({ nullable: true })
    experienceMonths?: number

    @ManyToOne(() => Resume, resume => resume.skills)
    resume!: Resume
} 