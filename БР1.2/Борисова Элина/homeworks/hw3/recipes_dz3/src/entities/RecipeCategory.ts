import { Entity, PrimaryColumn, ManyToOne } from "typeorm";
import { Recipe } from "./Recipe";
import { Category } from "./Category";

@Entity()
export class RecipeCategory {
    @PrimaryColumn()
    recipe_id: string;

    @PrimaryColumn()
    category_id: string;

    @ManyToOne(() => Recipe, (recipe) => recipe.categories, { onDelete: "CASCADE" })
    recipe: Recipe;

    @ManyToOne(() => Category, (category) => category.recipes, { onDelete: "CASCADE" })
    category: Category;
}