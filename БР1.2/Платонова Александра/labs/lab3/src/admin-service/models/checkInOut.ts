import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { Resident } from './Resident';
import { Room } from './room';
import { Payment } from './payment';

@Entity()
export class CheckInOut {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    doc_num: number;

    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    date_of_issue: Date;

    @Column({ type: 'text', nullable: true })
    comment: string;

    @Column({ type: 'text', nullable: true })
    check_out_reason: string;

    @Column({ type: 'date' })
    date_of_checkout: Date;

    @Column({ length: 100 })
    doc_name: string;

    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    date_of_start: Date;

    @ManyToOne(() => Resident, (resident) => resident.checkIns)
    resident: Resident;

    @ManyToOne(() => Room, (room) => room.checkIns)
    room: Room;

    @OneToOne(() => Payment, (payment) => payment.checkInOut)
    payment: Payment;
}