import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Address } from './address';
import { Room } from './room';

@Entity()
export class Hostel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, default: 'name of the hostel' })
    name: string;

    @Column()
    house_num: number;

    @Column()
    building: number;

    @OneToOne(() => Address, (address) => address.hostel)
    @JoinColumn()
    address: Address;

    @OneToMany(() => Room, (room) => room.hostel)
    rooms: Room[];
}