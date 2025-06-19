import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { RoutePoint } from "./RoutePoint";
import { Media } from "./Media";
import { Review } from "./Review";
import { Favorite } from "./Favorite";
import { Booking } from "./Booking";

@Entity()
export class Route {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    title: string;

    @Column('text')
    description: string;

    @Column('int')
    budget_min: number;

    @Column('int')
    budget_max: number;

    @Column('int')
    duration_days: number;

    @Column({ length: 50 })
    travel_type: string;

    @Column({ default: 'draft' })
    status: string;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => User, user => user.routes)
    user: User;

    @OneToMany(() => RoutePoint, point => point.route)
    points: RoutePoint[];

    @OneToMany(() => Media, media => media.route)
    media: Media[];

    @OneToMany(() => Review, review => review.route)
    reviews: Review[];

    @OneToMany(() => Favorite, favorite => favorite.route)
    favorites: Favorite[];

    @OneToMany(() => Booking, booking => booking.route)
    bookings: Booking[];
}