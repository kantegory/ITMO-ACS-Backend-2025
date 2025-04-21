import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Recipe } from "./Recipe";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    category_id!: number;

    @Column()
    category_name!: string;

    @ManyToOne(() => Recipe, recipe => recipe.categories)
    recipe!: Recipe;
}
