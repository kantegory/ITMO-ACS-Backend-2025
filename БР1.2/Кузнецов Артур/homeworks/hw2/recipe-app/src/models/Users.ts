import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Recipes } from "./Recipes";
import { Comments } from "./Comments";
import { Likes } from "./Likes";
import { SavedRecipes } from "./SavedRecipes";
import { Subscriptions } from "./Subscriptions";
import { Roles } from "./Roles";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", unique: true})
    email: string;

    @Column({type: "varchar"})
    password: string;

    @ManyToOne(() => Roles, (role) => role.users)
    role: Roles;

    @Column({type: "varchar"})
    first_name: string;

    @Column({type: "varchar"})
    last_name: string;

    @Column({type: "varchar", nullable: true})
    profile_picture: string;

    @Column({type: "varchar", nullable: true})
    phone_number: string;

    @Column({type: "varchar", nullable: true})
    gender: string;

    @Column({type: "varchar", nullable: true})
    bio: string;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;

    @OneToMany(() => Recipes, (recipe) => recipe.user)
    recipes: Recipes[]

    @OneToMany(() => Comments, (comment) => comment.user)
    comments: Comments[];

    @OneToMany(() => Likes, (like) => like.user)
    likes: Likes[];

    @OneToMany(() => SavedRecipes, (savedRecipe) => savedRecipe.user)
    savedRecipes: SavedRecipes[];

    @OneToMany(() => Subscriptions, (subscription) => subscription.follower)
    followingSubscriptions: Subscriptions[];

    @OneToMany(() => Subscriptions, (subscription) => subscription.following)
    followerSubscriptions: Subscriptions[];
}
