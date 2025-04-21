import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, OneToMany } from "typeorm"
import { User } from "./user.entity"
import { Company } from "./company.entity"

@Entity()
export class EmployerCabinet {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User)
    user: User

    @CreateDateColumn()
    created_at: Date

    @OneToMany(() => Company, company => company.employer)
    companies: Company[]
} 