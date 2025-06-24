import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn } from "typeorm"
import { Company } from "./Company"
import { JobCategory } from "./JobCategory"
import { JobOfferRequiredSkill } from "./JobOfferRequiredSkill"
import { EmployeeApplication } from "./EmployeeApplication"

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