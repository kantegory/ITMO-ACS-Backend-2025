import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm"
import { EmployeeCabinet } from "./employee-cabinet.entity"
import { ResumeSkill } from "./resume-skill.entity"

@Entity()
export class Resume {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => EmployeeCabinet, employee => employee.resumes)
    employee: EmployeeCabinet

    @Column({ length: 4096 })
    text: string

    @OneToMany(() => ResumeSkill, resumeSkill => resumeSkill.resume)
    skills: ResumeSkill[]
} 