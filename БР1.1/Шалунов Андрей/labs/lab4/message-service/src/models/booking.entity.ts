import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
    CreateDateColumn,
    JoinColumn
} from 'typeorm';
import { User } from './user.entity';
import { Message } from './message.entity';

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    booking_id!: number;

    @ManyToOne(() => User, u => u.bookings)
    @JoinColumn({ name: 'renter_id' })
    renter!: User;

    @Column()
    start_at!: Date;

    @Column()
    end_at!: Date;

    @Column('decimal')
    total_price!: number;

    @Column()
    deal_status!: string;

    @CreateDateColumn()
    created_at!: Date;

    @OneToMany(() => Message, m => m.booking)
    messages!: Message[];
}