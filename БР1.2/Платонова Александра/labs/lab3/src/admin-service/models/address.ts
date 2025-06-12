import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Hostel } from './hostel';

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    city_district: string;

    @Column({ length: 100 })
    street: string;

    @Column({ length: 20 })
    zip_code: string;

    @OneToOne(() => Hostel, (hostel) => hostel.address)
    hostel: Hostel;
}