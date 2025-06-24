import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Advertisement } from "./Advertisement";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Advertisement, advertisement => advertisement.photos)
    advertisement: Advertisement;

    @Column()
    url: string;
}