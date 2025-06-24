import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Recipes } from "./Recipes";
import { Ingredients } from "./Ingredients";

@Entity()
export class RecipeIngredients {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Recipes, (recipe) => recipe.recipeIngredients)
    recipe: Recipes;

    @ManyToOne(() => Ingredients, (ingredient) => ingredient.recipeIngredients)
    ingredient: Ingredients;

    @Column({type: "float"})
    quantity: number;

    @Column({type: "varchar"})
    unit: string;
}
