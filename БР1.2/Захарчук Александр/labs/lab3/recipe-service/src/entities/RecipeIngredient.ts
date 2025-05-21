import {
    Entity,
    Column,
    ManyToOne,
    PrimaryColumn,
    JoinColumn,
} from "typeorm";
import { Recipe } from "./Recipe";
import { Ingredient } from "./Ingredient";
import { Unit } from "../enums/unit.enum";


@Entity("recipes_ingredients")
export class RecipeIngredient {
    @PrimaryColumn()
    recipe_id: number;

    @PrimaryColumn()
    ingredient_id: number;

    @ManyToOne(() => Recipe, (recipe) => recipe.ingredients, { onDelete: "CASCADE" })
    @JoinColumn({ name: "recipe_id" })
    recipe: Recipe;

    @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipe_ingredients, { eager: true })
    @JoinColumn({ name: "ingredient_id" })
    ingredient: Ingredient;

    @Column("float")
    quantity: number;

    @Column({type: "enum", enum: Unit})
    unit: string;
}
