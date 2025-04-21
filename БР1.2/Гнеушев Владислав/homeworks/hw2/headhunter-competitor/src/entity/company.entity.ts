import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm"
import { EmployerCabinet } from "./employer-cabinet.entity"
import { JobOffer } from "./job-offer.entity"

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => EmployerCabinet, employer => employer.companies)
    employer: EmployerCabinet

    @Column({ length: 64 })
    name: string

    @Column({ length: 2048, nullable: true })
    description: string

    @OneToMany(() => JobOffer, jobOffer => jobOffer.company)
    jobOffers: JobOffer[]
} 