import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { EntityWithMetadata } from "./EntitiyWithMetadata";
import { User } from "./User";
import { RecipeIngredient } from "./RecipeToIngredient";
import { RecipeStep } from "./RecipeStep";
import { Comment } from "./Comment";
import { Like } from "./Like";

export enum DishType {
  APPETIZER = "appetizer",
  MAIN_COURSE = "main_course",
  DESSERT = "dessert",
  SALAD = "salad",
  SOUP = "soup",
  SIDE_DISH = "side_dish",
  BREAKFAST = "breakfast",
  SNACK = "snack",
  BEVERAGE = "beverage"
}

export enum DifficultyLevel {
  BEGINNER = "beginner",
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
  EXPERT = "xpert"
}

@Entity("recipe")
export class Recipe extends EntityWithMetadata {
    @PrimaryGeneratedColumn()
    recipe_id: number;

    @ManyToOne(() => User, user => user.recipes, {onDelete: "CASCADE"})
    @JoinColumn({ name: "username" })
    user: User;

    @Column()
    title: string;

    @Column("text")
    description: string;

    @Column({
        type: "enum",
        enum: DishType,
    })
    dish_type: DishType;

    @Column({
        type: "enum",
        enum: DifficultyLevel,
    })
    difficulty_level: DifficultyLevel;

    @Column("int")
    preparation_time_minutes: number;

    @Column()
    cooking_time_minutes: number;

    @OneToMany(() => RecipeIngredient, recipeIngredient => recipeIngredient.recipe)
    ingredients: RecipeIngredient[];

    @OneToMany(() => RecipeStep, step => step.recipe)
    steps: RecipeStep[];

    @OneToMany(() => Comment, comment => comment.recipe)
    comments: Comment[];

    @OneToMany(() => Like, like => like.recipe)
    likes: Like[];
}
