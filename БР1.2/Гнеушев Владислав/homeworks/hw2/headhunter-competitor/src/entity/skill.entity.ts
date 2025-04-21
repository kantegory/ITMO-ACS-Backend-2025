import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { ResumeSkill } from "./resume-skill.entity"
import { JobOfferRequiredSkill } from "./job-offer-required-skill.entity"

@Entity()
export class Skill {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 128 })
    name: string

    @OneToMany(() => ResumeSkill, resumeSkill => resumeSkill.skill)
    resumeSkills: ResumeSkill[]

    @OneToMany(() => JobOfferRequiredSkill, jobOfferSkill => jobOfferSkill.skill)
    jobOfferSkills: JobOfferRequiredSkill[]
} 