import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User";
import { Recipe } from "./Recipe";

@Entity()
export class Collection {
    @PrimaryGeneratedColumn()
    collection_id!: number;

    @ManyToOne(() => User, user => user.collections)
    user!: User;

    @Column()
    collection_name!: string;

    @ManyToMany(() => Recipe)
    @JoinTable()
    recipes!: Recipe[];
}
