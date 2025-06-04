import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import TravelType from './TravelType';
import Attraction from './Attraction';
import Media from './Media';
import Trip from './Trip';

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

    @OneToMany(() => Media, media => media.route)
    media: Media[];
}