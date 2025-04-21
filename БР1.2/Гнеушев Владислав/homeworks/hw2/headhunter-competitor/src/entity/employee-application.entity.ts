import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from "typeorm"
import { EmployeeCabinet } from "./employee-cabinet.entity"
import { JobOffer } from "./job-offer.entity"

@Entity()
export class EmployeeApplication {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => EmployeeCabinet, employee => employee.applications)
    employee: EmployeeCabinet

    @ManyToOne(() => JobOffer, jobOffer => jobOffer.applications)
    jobOffer: JobOffer

    @CreateDateColumn()
    applied_at: Date

    @Column({ default: false })
    seen_by_employer: boolean

    @Column({ nullable: true })
    is_accepted: boolean
} 