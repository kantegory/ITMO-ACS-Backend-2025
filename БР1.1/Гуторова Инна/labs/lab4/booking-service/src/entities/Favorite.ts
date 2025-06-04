import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Favorite {
    @PrimaryGeneratedColumn()
    favorite_id: number;

    @Column()
    user_id: number;

    @Column()
    route_id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    added_date: Date;
}