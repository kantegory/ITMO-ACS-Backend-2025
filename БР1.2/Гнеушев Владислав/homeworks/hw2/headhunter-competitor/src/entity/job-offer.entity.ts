import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn } from "typeorm"
import { Company } from "./company.entity"
import { JobCategory } from "./job-category.entity"
import { JobOfferRequiredSkill } from "./job-offer-required-skill.entity"
import { EmployeeApplication } from "./employee-application.entity"

@Entity()
export class JobOffer {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Company, company => company.jobOffers)
    company: Company

    @ManyToOne(() => JobCategory, jobCategory => jobCategory.jobOffers)
    jobCategory: JobCategory

    @Column({ length: 128 })
    name: string

    @Column({ length: 4096 })
    description: string

    @Column({ length: 1024, nullable: true })
    requirements: string

    @Column({ nullable: true })
    required_experience_months: number

    @Column({ nullable: true })
    salary_from_rub: number

    @Column({ nullable: true })
    salary_to_rub: number

    @Column()
    is_active: boolean

    @OneToMany(() => JobOfferRequiredSkill, jobOfferSkill => jobOfferSkill.jobOffer)
    requiredSkills: JobOfferRequiredSkill[]

    @OneToMany(() => EmployeeApplication, application => application.jobOffer)
    applications: EmployeeApplication[]
} 