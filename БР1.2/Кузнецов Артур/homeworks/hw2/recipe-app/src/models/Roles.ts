import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Users } from "./Users";

@Entity()
export class Roles {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", unique: true})
    name: string;

    @OneToMany(() => Users, (user) => user.role)
    users: Users[];
}
