import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { JobOffer } from "./JobOffer"
import { Skill } from "./Skill"

@Entity()
export class JobOfferRequiredSkill {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Skill, skill => skill.jobOfferSkills)
    skill: Skill

    @ManyToOne(() => JobOffer, jobOffer => jobOffer.requiredSkills)
    jobOffer: JobOffer
} 