import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, OneToMany, JoinColumn } from "typeorm"
import { User } from "./User"
import { Company } from "./Company"

@Entity()
export class EmployerCabinet {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @CreateDateColumn()
    created_at: Date

    @OneToMany(() => Company, company => company.employer)
    companies: Company[]
} 