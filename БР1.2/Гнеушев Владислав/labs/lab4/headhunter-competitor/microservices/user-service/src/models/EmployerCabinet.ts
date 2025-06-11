import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn } from "typeorm"
import { User } from "./User"

@Entity()
export class EmployerCabinet {
    @PrimaryGeneratedColumn()
    id!: number

    @OneToOne(() => User)
    @JoinColumn()
    user!: User

    @CreateDateColumn()
    created_at!: Date
} 