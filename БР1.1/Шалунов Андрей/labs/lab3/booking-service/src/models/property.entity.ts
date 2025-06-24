import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn
} from 'typeorm'
import { Booking } from './booking.entity'

@Entity()
export class Property {
    @PrimaryGeneratedColumn()
    property_id!: number

    @Column()
    type!: string

    @Column()
    title!: string

    @Column('text')
    description!: string

    @Column()
    location!: string

    @Column('decimal')
    price_per_day!: number

    @CreateDateColumn()
    listed_at!: Date

    @Column()
    status!: string

    @OneToMany(() => Booking, b => b.property)
    bookings!: Booking[]
}