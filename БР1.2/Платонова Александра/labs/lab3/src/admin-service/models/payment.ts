import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CheckInOut } from './checkInOut';

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('float')
    amount: number;

    @Column({ length: 50 })
    status: 'p' | 'np' | 'pp';

    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    date_pay: Date;

    @ManyToOne(() => CheckInOut, (checkInOut) => checkInOut.payment)
    checkInOut: CheckInOut;
}