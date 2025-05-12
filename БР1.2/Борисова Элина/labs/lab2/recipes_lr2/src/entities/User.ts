import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, Index } from "typeorm";
import { Recipe } from "./Recipe";
import { Comment } from "./Comment";
import { Like } from "./Like";
import { Subscription } from "./Subscription";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 50, unique: true })
    username: string;

    @Index()
    @Column({ type: "varchar", length: 100, unique: true })
    email: string;

    @Column({ type: "varchar", length: 255 })
    password_hash: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @OneToMany(() => Recipe, (recipe) => recipe.user)
    recipes: Recipe[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];

    @OneToMany(() => Like, (like) => like.user)
    likes: Like[];

    @OneToMany(() => Subscription, (subscription) => subscription.follower)
    followers: Subscription[];

    @OneToMany(() => Subscription, (subscription) => subscription.following)
    followings: Subscription[];

    @ManyToMany(() => Recipe, (recipe) => recipe.saved_by_users)
    @JoinTable()
    saved_recipes: Recipe[];
}