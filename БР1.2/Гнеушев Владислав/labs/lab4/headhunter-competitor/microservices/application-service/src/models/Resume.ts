import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { ResumeSkill } from "./ResumeSkill"

@Entity()
export class Resume {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    employeeId!: number

    @Column({ length: 4096 })
    text!: string

    @Column({ length: 128, nullable: true })
    title?: string

    @Column({ nullable: true })
    experienceYears?: number

    @Column({ nullable: true })
    expectedSalary?: number

    @Column({ default: true })
    isActive!: boolean

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @OneToMany(() => ResumeSkill, resumeSkill => resumeSkill.resume)
    skills?: ResumeSkill[]
} 