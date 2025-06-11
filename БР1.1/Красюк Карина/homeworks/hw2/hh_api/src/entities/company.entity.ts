import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import {User} from "./user.entity";
import {Vacancy} from "./vacancy.entity";

@Entity('companies')
export class Company {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.companies)
    user: User;
    
    @Column('varchar', { length: 255 })
    name: string;

    @Column('text', { nullable: true })
    description?: string;

    @Column('varchar', { nullable: true, length: 255 })
    website?: string;

    @Column('varchar', { nullable: true, length: 255 })
    location?: string;

    @OneToMany(() => Vacancy, vacancy => vacancy.company)
    vacancies: Vacancy[];
}