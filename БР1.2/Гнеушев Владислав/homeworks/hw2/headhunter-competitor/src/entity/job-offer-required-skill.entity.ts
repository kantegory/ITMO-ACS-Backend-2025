import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { JobOffer } from "./job-offer.entity"
import { Skill } from "./skill.entity"

@Entity()
export class JobOfferRequiredSkill {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Skill, skill => skill.jobOfferSkills)
    skill: Skill

    @ManyToOne(() => JobOffer, jobOffer => jobOffer.requiredSkills)
    jobOffer: JobOffer
} 