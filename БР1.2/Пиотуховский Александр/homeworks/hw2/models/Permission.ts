import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('permissions')
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    action: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'int', name: 'required_rank' })
    requiredRank: number;
}