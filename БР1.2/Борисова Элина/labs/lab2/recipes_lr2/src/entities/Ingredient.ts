import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RecipeIngredient } from "./RecipeIngredient";

@Entity()
export class Ingredient {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 100, unique: true })
    name: string;

    @OneToMany(() => RecipeIngredient, (recipeIngredient) => recipeIngredient.ingredient)
    recipes: RecipeIngredient[];
}