import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./userModel";
import { Vacancy } from "./vacancyModel";

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    name!: string;

    @Column({ type: "text" })
    description!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    location?: string;

    @OneToMany(() => User, (user) => user.company)
    users?: User[];

    @OneToMany(() => Vacancy, (vacancy) => vacancy.company)
    vacancies?: Vacancy[];
}
