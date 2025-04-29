import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique, JoinColumn } from "typeorm";
import { Recipe } from "./Recipe";
import { User } from "./User";

@Entity()
@Unique(["user", "recipe"])
export class SavedRecipe {
    
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.recipes_saved)
    @JoinColumn({name: "user_id"})
    user: User

    @ManyToOne(() => Recipe, (recipe) => recipe.users_saved)
    @JoinColumn({name: "recipe_id"})
    recipe: Recipe
}
