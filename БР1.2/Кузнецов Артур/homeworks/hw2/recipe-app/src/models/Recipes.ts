import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Users } from "./Users";
import { DishTypes } from "./DishTypes";
import { RecipeDifficulties } from "./RecipeDifficulties";
import { RecipeSteps } from "./RecipeSteps";
import { Comments } from "./Comments";
import { Likes } from "./Likes";
import { SavedRecipes } from "./SavedRecipes";
import { RecipeIngredients } from "./RecipeIngredients";

@Entity()
export class Recipes {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Users, (user) => user.recipes)
    user: Users;

    @ManyToOne(() => DishTypes, (dishType) => dishType.recipes)
    dishType: DishTypes;

    @ManyToOne(() => RecipeDifficulties, (difficulty) => difficulty.recipes)
    recipeDifficulty: RecipeDifficulties;

    @Column({type: "varchar"})
    title: string;

    @Column({type: "text"})
    description: string;

    @Column({type: "int"})
    preparation_time: number;

    @Column({type: "int"})
    cooking_time: number;

    @Column({type: "int"})
    servings: number;

    @Column({type: "varchar", nullable: true})
    image: string;

    @Column({type: "varchar", nullable: true})
    video: string;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date;

    @OneToMany(() => RecipeSteps, (step) => step.recipe)
    steps: RecipeSteps[];

    @OneToMany(() => Comments, (comment) => comment.recipe)
    comments: Comments[];

    @OneToMany(() => Likes, (like) => like.recipe)
    likes: Likes[];

    @OneToMany(() => SavedRecipes, (savedRecipe) => savedRecipe.recipe)
    savedBy: SavedRecipes[];

    @OneToMany(() => RecipeIngredients, (recipeIngredient) => recipeIngredient.recipe)
    recipeIngredients: RecipeIngredients[];
}
