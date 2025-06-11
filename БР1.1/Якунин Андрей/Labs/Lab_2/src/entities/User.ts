import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    registration_date!: Date;
}