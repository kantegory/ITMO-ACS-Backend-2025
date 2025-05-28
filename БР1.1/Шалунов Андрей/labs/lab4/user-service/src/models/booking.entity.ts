import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm'
import { User } from './user.entity'

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    booking_id!: number

    @ManyToOne(() => User, u => u.bookings)
    renter!: User
}