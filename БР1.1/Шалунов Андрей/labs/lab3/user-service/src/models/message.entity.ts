import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm'
import { User } from './user.entity'

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    message_id!: number

    @ManyToOne(() => User, u => u.sentMessages)
    sender!: User

    @ManyToOne(() => User, u => u.receivedMessages)
    recipient!: User
}