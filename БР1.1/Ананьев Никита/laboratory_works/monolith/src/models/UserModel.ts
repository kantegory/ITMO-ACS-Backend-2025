import { Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn, OneToMany } from "typeorm"
import { Message } from "./MessageModel"
import { Property } from "./PropertyModel"
import { Rent } from "./RentModel"


@Entity()
@Index(["firstName", "lastName"])
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Index()
    @Column({ unique: true })
    email!: string

    @Column()
    password!:string;

    @Column()
    firstName!: string

    @Column({ nullable: true })
    lastName?: string

    @Column()
    birthDate!: Date

    @CreateDateColumn()
    registerDate!: Date

    @OneToMany(() => Rent, (rent) => rent.renting)
    rents?: Rent[]

    @OneToMany(() => Property, (prop) => prop.owner)
    properties?: Property[]

    @OneToMany(() => Message, (msg) => msg.sender)
    sentMessages?: Message[]

    @OneToMany(() => Message, (msg) => msg.receiver)
    receivedMessages?: Message[]

    constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}
