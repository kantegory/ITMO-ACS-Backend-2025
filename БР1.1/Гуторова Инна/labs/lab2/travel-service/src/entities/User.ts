import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Booking from "./Booking";
import Favorite from "./Favorite";
import Comment from "./Comment";
import Review from "./Review";

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    hashed_password!: string;

    @Column({ nullable: true })
    first_name?: string;

    @Column({ nullable: true })
    last_name?: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    registration_date!: Date;

    @Column({ default: false })
    isAdmin!: boolean;

    @OneToMany(() => Booking, booking => booking.user)
    bookings!: Booking[];

    @OneToMany(() => Favorite, favorite => favorite.user)
    favorites!: Favorite[];

    @OneToMany(() => Comment, comment => comment.user)
    comments!: Comment[];

    @OneToMany(() => Review, review => review.user)
    reviews!: Review[];
}