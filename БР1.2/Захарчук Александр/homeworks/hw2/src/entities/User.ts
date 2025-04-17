import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { EntityWithMetadata } from "./EntitiyWithMetadata";
import { Recipe } from "./Recipe";
import { Comment } from "./Comment";
import { Like } from "./Like";
import { Subscription } from "./Subscription";
import { SavedRecipe } from "./SavedRecipe";

@Entity("user")
export class User extends EntityWithMetadata {
    @PrimaryColumn()
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password_hash: string;

    @Column({ nullable: true })
    profile_picture: string;

    @Column("text", { nullable: true })
    bio: string;

    @OneToMany(() => Recipe, recipe => recipe.user)
    recipes: Recipe[];

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[];

    @OneToMany(() => Like, like => like.user)
    likes: Like[];

    @OneToMany(() => Subscription, subscription => subscription.follower)
    followers: Subscription[];

    @OneToMany(() => Subscription, subscription => subscription.followed)
    following: Subscription[];

    @OneToMany(() => SavedRecipe, savedRecipe => savedRecipe.user)
    savedRecipes: SavedRecipe[];
}
