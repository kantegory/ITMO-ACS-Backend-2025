import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany } from 'typeorm';
import { User } from './User';
import { Category } from './Category';
import { Photo } from './Photo';
import { Property } from './Property';
import { Rental } from './Rental';
import { Message } from './Message';

@Entity()
export class Advertisement {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.advertisements)
    owner: User;

    @ManyToOne(() => Category, category => category.advertisements)
    category: Category;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    rent_type: "day" | "month";

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({ type: "enum", enum: ["active", "archived"] })
    status: "active" | "archived";

    @Column("decimal")
    price_per_period: number;

    @Column("decimal")
    comission: number;

    @Column("decimal")
    deposit: number;

    @OneToMany(() => Photo, photo => photo.advertisement)
    photos: Photo[];

    @OneToMany(() => Property, property => property.advertisement)
    properties: Property[];

    @OneToMany(() => Rental, rental => rental.advertisement)
    rentals: Rental[];

    @OneToMany(() => Message, message => message.advertisement)
    messages: Message[];
}
