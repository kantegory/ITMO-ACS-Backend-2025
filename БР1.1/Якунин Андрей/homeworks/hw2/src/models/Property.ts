import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToOne } from 'typeorm';
import { Advertisement } from './Advertisement';
import { Living } from './Living';

@Entity()
export class Property {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Advertisement, advertisement => advertisement.properties)
    advertisement: Advertisement;

    @OneToOne(() => Living, living => living.property)
    living: Living;

    @Column()
    total_area: number;

    @Column()
    location: string;

    @Column()
    type: "commercial" | "living" | "other";
}
