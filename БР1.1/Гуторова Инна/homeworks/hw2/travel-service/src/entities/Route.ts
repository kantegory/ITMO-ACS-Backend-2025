import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import TravelType from "./TravelType";
import Trip from "./Trip";
import Attraction from "./Attraction";
import Favorite from "./Favorite";
import Comment from "./Comment";
import Review from "./Review";
import Media from "./Media";

@Entity()
export default class Route {
    @PrimaryGeneratedColumn()
    route_id: number;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column()
    duration: string;

    @ManyToOne(() => TravelType, travelType => travelType.routes)
    travel_type: TravelType;

    @OneToMany(() => Trip, trip => trip.route)
    trips: Trip[];

    @OneToMany(() => Attraction, attraction => attraction.route)
    attractions: Attraction[];

    @OneToMany(() => Favorite, favorite => favorite.route)
    favorites: Favorite[];

    @OneToMany(() => Comment, comment => comment.route)
    comments: Comment[];

    @OneToMany(() => Review, review => review.route)
    reviews: Review[];

    @OneToMany(() => Media, media => media.route)
    media: Media[];
}