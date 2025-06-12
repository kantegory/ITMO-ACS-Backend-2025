import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CheckInOut } from './checkInOut';

@Entity()
export class Resident {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    full_name: string;

    @Column({ length: 20 })
    phone: string;

    @Column({ length: 100, unique: true })
    email: string;

    @OneToMany(() => CheckInOut, (checkIn) => checkIn.resident)
    checkIns: CheckInOut[];
}