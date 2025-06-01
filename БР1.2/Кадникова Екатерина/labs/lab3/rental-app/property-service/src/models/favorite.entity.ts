import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column } from 'typeorm';

@Entity('favorites')
export class Favorite {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    userId!: number;

    @Column()
    propertyId!: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
}