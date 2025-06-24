import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne,
    OneToMany, CreateDateColumn
} from "typeorm";
import { User } from "./User";
import { Rental } from "./Rental";
import { Message } from "./Message";
import { Favorite } from "./Favorite";
import { RentalType } from "./enums/RentalType";
import { PropertyType } from "./enums/PropertyType";

@Entity()
export class Property {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.properties)
    owner: User;

    @Column()
    title: string;

    @Column("text", { nullable: true })
    description: string;

    @Column({ type: "enum", enum: RentalType })
    rental_type: RentalType;

    @Column("decimal")
    price: number;

    @Column()
    location: string;

    @Column({ type: "enum", enum: PropertyType })
    property_type: PropertyType;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Rental, rental => rental.property)
    rentals: Rental[];

    @OneToMany(() => Message, message => message.property)
    messages: Message[];

    @OneToMany(() => Favorite, favorite => favorite.property)
    favorites: Favorite[];
}