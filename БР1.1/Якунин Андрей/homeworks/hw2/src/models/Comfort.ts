import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { LivingComfort } from './LivingComfort';

@Entity()
export class Comfort {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    renovation: string;

    @Column()
    devices: string;

    @Column()
    internet: boolean;

    @Column()
    tv: boolean;

    @Column()
    furniture: boolean;

    @OneToMany(() => LivingComfort, livingComfort => livingComfort.comfort)
    livingComforts: LivingComfort[];
}
