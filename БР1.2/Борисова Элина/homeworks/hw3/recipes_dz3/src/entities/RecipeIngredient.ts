import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Recipe } from "./Recipe";
import { Ingredient } from "./Ingredient";

@Entity()
export class RecipeIngredient {
    @PrimaryColumn()
    recipe_id: string;

    @PrimaryColumn()
    ingredient_id: string;

    @Column({ type: "varchar", length: 50 })
    quantity: string;

    @ManyToOne(() => Recipe, (recipe) => recipe.ingredients, { onDelete: "CASCADE" })
    recipe: Recipe;

    @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipes, { onDelete: "CASCADE" })
    ingredient: Ingredient;
}