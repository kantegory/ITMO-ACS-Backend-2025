import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Booking from "./Booking";
import Favorite from "./Favorite";
import Comment from "./Comment";
import Review from "./Review";

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({ type: 'date' })
    registration_date: Date;

    @Column({ default: false })
    isAdmin: boolean;

    @OneToMany(() => Booking, (booking: Booking) => booking.user)
    bookings: Booking[];

    @OneToMany(() => Favorite, (favorite: Favorite) => favorite.user)
    favorites!: Favorite[];

    @OneToMany(() => Comment, (comment: Comment) => comment.user)
    comments!: Comment[];

    @OneToMany(() => Review, (review: Review) => review.user)
    reviews!: Review[];
}