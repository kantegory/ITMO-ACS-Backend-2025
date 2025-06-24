import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn
} from 'typeorm'
import { Property } from './property.entity'

@Entity()
export class PropertyPhoto {
    @PrimaryGeneratedColumn()
    photo_id!: number

    @ManyToOne(() => Property, p => p.photos)
    property!: Property

    @Column()
    photo_url!: string

    @Column({ nullable: true })
    description?: string

    @CreateDateColumn()
    uploaded_at!: Date
}