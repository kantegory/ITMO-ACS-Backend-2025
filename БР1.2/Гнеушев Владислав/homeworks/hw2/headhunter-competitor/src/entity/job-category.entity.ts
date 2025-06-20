import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { JobOffer } from "./job-offer.entity"

@Entity()
export class JobCategory {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 64 })
    name: string

    @OneToMany(() => JobOffer, jobOffer => jobOffer.jobCategory)
    jobOffers: JobOffer[]
} 