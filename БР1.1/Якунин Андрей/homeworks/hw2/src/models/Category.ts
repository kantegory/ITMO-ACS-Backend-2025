import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Advertisement } from "./Advertisement";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Advertisement, advertisement => advertisement.category)
    advertisements: Advertisement[];
}
