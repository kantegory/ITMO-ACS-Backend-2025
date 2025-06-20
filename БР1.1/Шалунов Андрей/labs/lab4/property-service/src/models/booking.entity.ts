import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm'
import { Property } from './property.entity'

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    booking_id!: number

    @ManyToOne(() => Property, p => p.bookings)
    property!: Property
}