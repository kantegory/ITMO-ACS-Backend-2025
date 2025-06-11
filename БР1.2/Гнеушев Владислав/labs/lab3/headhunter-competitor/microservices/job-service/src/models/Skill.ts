import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { JobOfferRequiredSkill } from "./JobOfferRequiredSkill"

@Entity()
export class Skill {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ length: 128 })
    name!: string

    @Column({ length: 512, nullable: true })
    description?: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @OneToMany(() => JobOfferRequiredSkill, jobOfferSkill => jobOfferSkill.skill)
    jobOfferSkills?: JobOfferRequiredSkill[]
} 