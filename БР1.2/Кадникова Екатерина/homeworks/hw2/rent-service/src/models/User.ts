import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Property } from "./Property";
import { Rental } from "./Rental";
import { Message } from "./Message";
import { Favorite } from "./Favorite";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password_hash: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Property, property => property.owner)
    properties: Property[];

    @OneToMany(() => Rental, rental => rental.tenant)
    rentals: Rental[];

    @OneToMany(() => Message, message => message.sender)
    sentMessages: Message[];

    @OneToMany(() => Message, message => message.receiver)
    receivedMessages: Message[];

    @OneToMany(() => Favorite, favorite => favorite.user)
    favorites: Favorite[];
}