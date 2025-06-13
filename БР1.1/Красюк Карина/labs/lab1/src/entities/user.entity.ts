import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 255 })
    name: string;

    @Column('varchar', { length: 255, unique: true })
    email: string;

    @Column('varchar', { name: 'password_hash', length: 255 })
    passwordHash: string;

    @Column({name: 'registration_date', type: 'timestamp'})
    registrationDate: Date;
}