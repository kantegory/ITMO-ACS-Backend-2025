import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Route from "./Route";
import Attraction from "./Attraction";

@Entity()
export default class Media {
    @PrimaryGeneratedColumn()
    media_id: number;

    @ManyToOne(() => Route, route => route.media)
    route: Route;

    @ManyToOne(() => Attraction, attraction => attraction.media)
    attraction: Attraction;

    @Column()
    type: string;

    @Column()
    url: string;
}