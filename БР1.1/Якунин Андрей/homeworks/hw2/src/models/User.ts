import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Advertisement } from "./Advertisement";
import { Rental } from "./Rental";
import { Message } from "./Message";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mail: string;

    @Column()
    password: string;

    @Column()
    first_name: string;

    @Column()
    second_name: string;

    @Column()
    phone: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;

    @OneToMany(() => Advertisement, advertisement => advertisement.owner)
    advertisements: Advertisement[];

    @OneToMany(() => Rental, rental => rental.renter)
    rentals: Rental[];

    @OneToMany(() => Message, message => message.user_sender)
    sentMessages: Message[];

    @OneToMany(() => Message, message => message.user_receiver)
    receivedMessages: Message[];
}
