import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn
} from 'typeorm'
import { Property } from './property.entity'
import { Booking } from './booking.entity'
import { Message } from './message.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id!: number

    @Column()
    name!: string

    @Column({ unique: true })
    email!: string

    @Column({ nullable: true })
    phone?: string

    @Column()
    password!: string

    @CreateDateColumn()
    created_at!: Date

    @OneToMany(() => Property, p => p.owner)
    properties!: Property[]

    @OneToMany(() => Booking, b => b.renter)
    bookings!: Booking[]

    @OneToMany(() => Message, m => m.sender)
    sentMessages!: Message[]

    @OneToMany(() => Message, m => m.recipient)
    receivedMessages!: Message[]
}