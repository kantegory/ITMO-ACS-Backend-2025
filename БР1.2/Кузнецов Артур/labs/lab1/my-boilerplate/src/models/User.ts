import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    password: string;

    @Column({ type: 'varchar', length: 127, nullable: false })
    first_name: string;

    @Column({ type: 'varchar', length: 127, nullable: true })
    last_name: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    profile_picture: string;

    @Column({ type: 'varchar', length: 31, nullable: true })
    phone_number: string;

    @Column({ type: 'varchar', length: 15, nullable: true })
    gender: string;

    @Column({ type: 'text', nullable: true })
    bio: string;

    @Column({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
