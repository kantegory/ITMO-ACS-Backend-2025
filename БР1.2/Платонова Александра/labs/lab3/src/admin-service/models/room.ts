import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Hostel } from './hostel';
import { CheckInOut } from './checkInOut';

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    floor: number;

    @Column()
    beds: number;

    @Column('float')
    area: number;

    @Column()
    busy_beds: number;

    @ManyToOne(() => Hostel, (hostel) => hostel.rooms)
    hostel: Hostel;

    @OneToMany(() => CheckInOut, (checkIn) => checkIn.room)
    checkIns: CheckInOut[];
}