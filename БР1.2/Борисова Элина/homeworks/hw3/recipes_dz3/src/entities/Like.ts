import { Entity, PrimaryColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Recipe } from "./Recipe";

@Entity()
export class Like {
    @PrimaryColumn()
    user_id: string;

    @PrimaryColumn()
    recipe_id: string;

    @ManyToOne(() => User, (user) => user.likes, { onDelete: "CASCADE" })
    user: User;

    @ManyToOne(() => Recipe, (recipe) => recipe.likes, { onDelete: "CASCADE" })
    recipe: Recipe;
}