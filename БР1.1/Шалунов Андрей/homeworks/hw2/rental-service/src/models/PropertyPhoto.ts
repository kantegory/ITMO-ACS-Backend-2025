import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import { Property } from './Property';

@Entity()
export class PropertyPhoto {
    @PrimaryGeneratedColumn()
    photo_id!:number;

    @ManyToOne(() => Property, p => p.photos)
    property!: Property;

    @Column()
    photo_url!: string;

    @Column({nullable: true})
    description?: string;
}