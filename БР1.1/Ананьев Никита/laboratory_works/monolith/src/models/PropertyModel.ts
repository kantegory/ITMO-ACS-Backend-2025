import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm"
import { PropertyType } from './PropertyTypeModel'
import { User } from "./UserModel"
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

    @ManyToOne(() => PropertyType)
    type!: PropertyType

    @ManyToOne(() => User)
    owner!: User

    @OneToMany(() => Rent, (rent) => rent.property)
    rents?: Rent[]

    constructor(init?: Partial<Property>) {
        Object.assign(this, init);
    }
}
