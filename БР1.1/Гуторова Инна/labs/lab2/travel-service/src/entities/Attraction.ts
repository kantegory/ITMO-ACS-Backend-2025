import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import Route from "./Route";
import Media from "./Media";

@Entity()
export default class Attraction {
    @PrimaryGeneratedColumn()
    attraction_id: number;

    @Column()
    name: string;

    @Column('text')
    description: string;

    @Column()
    location: string;

    @ManyToOne(() => Route, route => route.attractions)
    route: Route;

    @OneToMany(() => Media, media => media.attraction)
    media: Media[];
}