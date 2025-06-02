import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
} from "typeorm";
import {Recipe} from "./Recipe";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", unique: true })
    name!: string;

    @ManyToMany(() => Recipe, recipe => recipe.tags)
    recipes!: Recipe[];
}
