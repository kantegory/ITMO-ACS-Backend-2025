import { EntityWithMetadata } from "./EntitiyWithMetadata";
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Recipe } from "./Recipe";
import { Ingredient } from "./Ingredient";

export enum Unit {
  GRAM = "g",
  KILOGRAM = "kg",
  MILLILITER = "ml",
  LITER = "l",
  TEASPOON = "tsp",
  TABLESPOON = "tbsp",
  CUP = "cup",
  PIECE = "piece",
  SLICE = "slice",
  PINCH = "pinch",
  DASH = "dash",
  DROP = "drop",
  BUNCH = "bunch",
  LEAF = "leaf",
  CLOVE = "clove",
  CAN = "can",
  BOTTLE = "bottle",
  PACKAGE = "package"
}

@Entity("recipe_ingredient")
export class RecipeIngredient extends EntityWithMetadata{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Recipe, recipe => recipe.ingredients, {onDelete: "CASCADE"})
    @JoinColumn({ name: "recipe_id" })
    recipe: Recipe;

    @ManyToOne(() => Ingredient, ingredient => ingredient.recipes, {onDelete: "CASCADE"})
    @JoinColumn({ name: "ingredient_id" })
    ingredient: Ingredient;

    @Column("float")
    quantity: number;

    @Column({
        type: "enum",
        enum: Unit,
    })
    unit: Unit;
}
