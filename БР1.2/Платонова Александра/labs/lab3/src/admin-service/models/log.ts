import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Log {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column({ length: 50 })
    action: string;

    @Column('text')
    details: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    timestamp: Date;
}