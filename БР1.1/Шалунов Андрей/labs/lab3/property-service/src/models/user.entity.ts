import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
} from 'typeorm'
import { Property } from './property.entity'

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

    @OneToMany(() => Property, p => p.owner)
    properties!: Property[]
}