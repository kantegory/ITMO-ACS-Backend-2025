import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    booking_id: number;

    @Column()
    user_id: number;

    @Column()
    trip_id: number;
    @Column()
    status: string;

    @Column()
    booking_date: Date;

    @Column()
    participants_count: number;
}