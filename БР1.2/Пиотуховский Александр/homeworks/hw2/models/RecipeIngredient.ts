import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique, JoinColumn } from 'typeorm';
import { Recipe } from './Recipe';
import { Ingredient } from './Ingredient';

@Entity('recipe_ingredients')
@Unique(['recipe', 'ingredient'])
export class RecipeIngredient {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Recipe, recipe => recipe.ingredients, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'recipe_id' })
    recipe: Recipe;

    @ManyToOne(() => Ingredient, ingredient => ingredient.recipeIngredients, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'ingredient_id' })
    ingredient: Ingredient;
}