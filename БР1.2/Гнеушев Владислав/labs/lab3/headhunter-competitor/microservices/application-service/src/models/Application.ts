import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

export enum ApplicationStatus {
    PENDING = 'pending',
    REVIEWED = 'reviewed',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected'
}

@Entity()
export class Application {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    employeeId!: number

    @Column()
    jobOfferId!: number

    @Column()
    resumeId!: number

    @Column({
        type: 'enum',
        enum: ApplicationStatus,
        default: ApplicationStatus.PENDING
    })
    status!: ApplicationStatus

    @Column({ default: false })
    seenByEmployer!: boolean

    @Column({ length: 1024, nullable: true })
    coverLetter?: string

    @CreateDateColumn()
    appliedAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
} 