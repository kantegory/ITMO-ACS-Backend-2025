import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Route } from "./Route";

@Entity()
export class Media {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    url: string;

    @Column({ length: 20 })
    media_type: string;

    @Column({ length: 200, nullable: true })
    caption: string;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => Route, route => route.media)
    route: Route;
}