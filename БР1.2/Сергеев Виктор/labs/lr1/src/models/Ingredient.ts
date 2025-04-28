import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RecipeIngredient } from "./RecipeIngredient";

@Entity()
export class Ingredient {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar", length: 50, unique: true})
    name: string

    @OneToMany(() => RecipeIngredient, (recipeIngredient) => recipeIngredient.ingredient)
    recipe_ingredients: Array<RecipeIngredient>
}