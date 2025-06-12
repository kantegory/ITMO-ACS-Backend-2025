import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Resident } from './resident';

@Entity()
export class CheckInOut {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    date_of_start: Date;

    @Column({ type: 'date', nullable: true })
    date_of_checkout: Date;

    @ManyToOne(() => Resident, (resident) => resident.checkIns)
    resident: Resident;

    @Column()
    room_id: number;
}