import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm'
import { User } from './user.entity'

@Entity()
export class Property {
    @PrimaryGeneratedColumn()
    property_id!: number

    @ManyToOne(() => User, u => u.properties)
    owner!: User
}