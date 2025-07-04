import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn } from "typeorm"
import { User } from "./User"

@Entity()
export class EmployeeCabinet {
    @PrimaryGeneratedColumn()
    id!: number

    @OneToOne(() => User)
    @JoinColumn()
    user!: User

    @Column({ length: 128 })
    first_name!: string

    @Column({ length: 128 })
    last_name!: string

    @Column({ length: 4096, nullable: true })
    resume_text?: string

    @Column()
    updated_resume_at!: Date

    @CreateDateColumn()
    created_at!: Date
} 