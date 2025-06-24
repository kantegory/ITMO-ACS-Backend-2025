import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, OneToMany, JoinColumn } from "typeorm"
import { User } from "./user.entity"
import { Resume } from "./resume.entity"
import { EmployeeApplication } from "./employee-application.entity"

@Entity()
export class EmployeeCabinet {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @Column({ length: 128 })
    first_name: string

    @Column({ length: 128 })
    last_name: string

    @Column({ length: 4096, nullable: true })
    resume_text: string

    @Column()
    updated_resume_at: Date

    @CreateDateColumn()
    created_at: Date

    @OneToMany(() => Resume, resume => resume.employee)
    resumes: Resume[]

    @OneToMany(() => EmployeeApplication, application => application.employee)
    applications: EmployeeApplication[]
} 