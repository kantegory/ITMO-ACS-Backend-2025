import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne } from "typeorm"
import { EmployeeCabinet } from "./employee-cabinet.entity"
import { EmployerCabinet } from "./employer-cabinet.entity"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 64 })
    email: string

    @Column({ length: 32 })
    password_hash: string

    @CreateDateColumn()
    created_at: Date

    @OneToOne(() => EmployeeCabinet, employeeCabinet => employeeCabinet.user)
    employeeCabinet: EmployeeCabinet

    @OneToOne(() => EmployerCabinet, employerCabinet => employerCabinet.user)
    employerCabinet: EmployerCabinet
}