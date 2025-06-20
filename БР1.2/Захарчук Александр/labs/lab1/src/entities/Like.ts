import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { EntityWithMetadata } from "./EntitiyWithMetadata";
import { Recipe } from "./Recipe";
import { User } from "./User";


@Entity("like")
export class Like extends EntityWithMetadata {
    @PrimaryGeneratedColumn()
    like_id: number;

    @ManyToOne(() => Recipe, recipe => recipe.likes, {onDelete: "CASCADE"})
    @JoinColumn({ name: "recipe_id" })
    recipe: Recipe;

    @ManyToOne(() => User, user => user.likes, {onDelete: "CASCADE"})
    @JoinColumn({ name: "username" })
    user: User;
}
