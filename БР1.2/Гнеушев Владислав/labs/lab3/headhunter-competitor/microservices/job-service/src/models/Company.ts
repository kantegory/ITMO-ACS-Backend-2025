import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { JobOffer } from "./JobOffer"

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    employerId!: number

    @Column({ length: 64 })
    name!: string

    @Column({ length: 2048, nullable: true })
    description?: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @OneToMany(() => JobOffer, jobOffer => jobOffer.company)
    jobOffers?: JobOffer[]
} 