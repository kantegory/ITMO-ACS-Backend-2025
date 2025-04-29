import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, JoinColumn } from "typeorm";
import { Recipe } from "./Recipe";
import { Ingredient } from "./Ingredient";

@Entity()
@Unique(["recipe", "ingredient"])
export class RecipeIngredient {
    
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Recipe, (recipe) => recipe.recipe_ingredients)
    @JoinColumn({name: "recipe_id"})
    recipe: Recipe

    @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipe_ingredients)
    @JoinColumn({name: "ingredient_id"})
    ingredient: Ingredient

    @Column({type: "integer"})
    amount: number

    @Column({type: "varchar", length: 30})
    unit: string
}
