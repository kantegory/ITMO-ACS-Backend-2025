import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Route from './Route';
import Attraction from './Attraction';

@Entity()
export default class Media {
    @PrimaryGeneratedColumn()
    media_id: number;

    @Column()
    url: string;

    @Column({ enum: ['image', 'video'] })
    type: string;

    @ManyToOne(() => Route, route => route.media, { nullable: true })
    route?: Route;

    @ManyToOne(() => Attraction, attraction => attraction.media, { nullable: true })
    attraction?: Attraction;
}