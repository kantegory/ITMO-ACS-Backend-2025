import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn
} from 'typeorm'
import { Property } from './property.entity'
import { User } from './user.entity'
import { Message } from './message.entity'

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    booking_id!: number

    @ManyToOne(() => Property, p => p.bookings)
    property!: Property

    @ManyToOne(() => User, u => u.bookings)
    renter!: User

    @Column()
    start_at!: Date

    @Column()
    end_at!: Date

    @Column('decimal')
    total_price!: number

    @Column()
    deal_status!: string

    @CreateDateColumn()
    created_at!: Date

    @OneToMany(() => Message, m => m.booking)
    messages!: Message[]
}