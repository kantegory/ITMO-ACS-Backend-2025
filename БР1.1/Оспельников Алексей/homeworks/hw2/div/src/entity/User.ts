import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fullname: string

    @Column()
    phone: string

    @Column()
    city: string

    @Column({unique: true})
    email: string

    @Column()
    username: string

    @Column()
    password: string

    @CreateDateColumn()
    created_at!: Date;

    @OneToMany(() => Message, message => message.recipient)
    receivedMessages!: Message[];

    @OneToMany(() => Message, message => message.sender)
    sentMessages!: Message[];

    @OneToMany(() => Rent, rent => rent.tenant)
    tenants!: Rent[];

    @OneToMany(() => Property, property => property.renter)
    renters!: Property[];
}
