import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, Index } from "typeorm"
import { PropertyType } from './PropertyTypeModel'
import { Rent } from "./RentModel"

@Entity()
export class Property {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    area!: number

    @Column()
    address!: string

    @Column({type: "text"})
    description: string = ""

    @Column()
    @Index()
    ownerId!: number

    @ManyToOne(() => PropertyType)
    type!: PropertyType

    @OneToMany(() => Rent, (rent) => rent.property)
    rents?: Rent[]

    constructor(init?: Partial<Property>) {
        Object.assign(this, init);
    }
}
