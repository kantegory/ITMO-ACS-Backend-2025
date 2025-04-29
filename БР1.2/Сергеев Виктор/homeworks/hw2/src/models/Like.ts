import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique, JoinColumn } from "typeorm";
import { Recipe } from "./Recipe";
import { User } from "./User";

@Entity()
@Unique(["recipe", "user"])
export class Like {
    
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Recipe, (recipe) => recipe.recipe_ingredients)
    @JoinColumn({name: "recipe_id"})
    recipe: Recipe

    @ManyToOne(() => User, (user) => user.recipes_liked)
    @JoinColumn({name: "user_id"})
    user: User
}
