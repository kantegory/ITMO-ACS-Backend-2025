import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm'
import { Booking } from './booking.entity'

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    message_id!: number

    @ManyToOne(() => Booking, b => b.messages)
    booking!: Booking
}