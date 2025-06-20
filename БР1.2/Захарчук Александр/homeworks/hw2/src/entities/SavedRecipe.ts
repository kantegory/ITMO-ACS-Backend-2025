import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { EntityWithMetadata } from "./EntitiyWithMetadata";
import { User } from "./User";
import { Recipe } from "./Recipe";


@Entity("saved_recipe")
export class SavedRecipe extends EntityWithMetadata {
    @PrimaryGeneratedColumn()
    saved_recipe_id: number;

    @ManyToOne(() => User, user => user.savedRecipes, {onDelete: "CASCADE"})
    @JoinColumn({ name: "username" })
    user: User;

    @ManyToOne(() => Recipe, {onDelete: "CASCADE"})
    @JoinColumn({ name: "recipe_id" })
    recipe: Recipe;
}
