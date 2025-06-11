import {Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn} from "typeorm";
import {Company} from "./company.entity";
import {Resume} from "./resume.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 255 })
    name: string;

    @Column('varchar', { length: 255, unique: true })
    email: string;

    @Column('varchar', { length: 255 })
    password_hash: string;

    @Column('int')
    role: number;

    @Column({type: 'timestamp'})
    registration_date: Date;

    @OneToMany(() => Company, company => company.user)
    companies: Company[];

    @OneToMany(() => Resume, resume => resume.user)
    resumes: Resume[];
}
