import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./userModel";
import { Vacancy } from "./vacancyModel";

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    location: string;

    // Убираем инициализацию массивов, TypeORM сам позаботится о связи
    @OneToMany(() => User, (user) => user.company)
    users?: User[];

    @OneToMany(() => Vacancy, (vacancy) => vacancy.company)
    vacancies?: Vacancy[];

    constructor(
        name: string,
        description: string,
        location: string
    ) {
        this.name = name;
        this.description = description;
        this.location = location;
    }
}
