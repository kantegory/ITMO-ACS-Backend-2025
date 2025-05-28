import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn
} from 'typeorm'
import { User } from './user.entity'
import { PropertyPhoto } from './photo.entity'
import { Booking } from './booking.entity'

@Entity()
export class Property {
    @PrimaryGeneratedColumn()
    property_id!: number

    @ManyToOne(() => User, u => u.properties)
    owner!: User

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

    @OneToMany(() => PropertyPhoto, p => p.property)
    photos!: PropertyPhoto[]

    @OneToMany(() => Booking, b => b.property)
    bookings!: Booking[]
}