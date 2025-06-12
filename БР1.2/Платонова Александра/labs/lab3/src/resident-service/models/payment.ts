import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('float')
    amount: number;

    @Column({ length: 50 })
    status: 'p' | 'np' | 'pp'; // paid / not paid / partially paid

    @Column({ type: 'date' })
    date_pay: Date;

    @Column()
    check_in_out_id: number;
}