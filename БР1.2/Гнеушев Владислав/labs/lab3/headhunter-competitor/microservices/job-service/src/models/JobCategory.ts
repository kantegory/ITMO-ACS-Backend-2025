import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { JobOffer } from "./JobOffer"

@Entity()
export class JobCategory {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ length: 64 })
    name!: string

    @Column({ length: 512, nullable: true })
    description?: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @OneToMany(() => JobOffer, (jobOffer: JobOffer) => jobOffer.jobCategory)
    jobOffers?: JobOffer[]
} 