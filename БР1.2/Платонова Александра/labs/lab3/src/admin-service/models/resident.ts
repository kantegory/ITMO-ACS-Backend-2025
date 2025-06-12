import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { CheckInOut } from './CheckInOut';
import { Room } from './Room';

@Entity()
export class Resident {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    full_name: string;

    @Column({ length: 20, unique: true })
    phone: string;

    @Column({ length: 100, unique: true })
    email: string;

    @Column({ type: 'date', nullable: true })
    birth_date: Date;

    @Column({ length: 50, nullable: true })
    university: string;

    @Column({ length: 50, nullable: true })
    student_id: string;

    @OneToMany(() => CheckInOut, (checkIn) => checkIn.resident)
    checkIns: CheckInOut[];

    @ManyToOne(() => Room, (room) => room.current_residents, { nullable: true })
    @JoinColumn({ name: 'current_room_id' })
    current_room: Room | null;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @Column({ default: false })
    is_deleted: boolean;
}