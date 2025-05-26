import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Recipe} from "./Recipe";
import {Like} from "./Like";
import {Comment} from "./Comment";
import {Subscription} from "./Subscribtion";

/**
 * User model
 */
@Entity()
export class User {
    /**
     * The unique identifier for the user
     * @example 1
     */
    @PrimaryGeneratedColumn()
    id!: number;

    /**
     * The user's full name
     * @example "John Doe"
     */
    @Column()
    name!: string;

    /**
     * The user's email address
     * @example "john.doe@example.com"
     */
    @Column({unique: true})
    email!: string;

    /**
     * The user's password (hashed)
     * @example "$2b$10$..."
     */
    @Column({ select: false })
    password!: string;

    /**
     * Recipes created by the user
     */
    @OneToMany(() => Recipe, recipe => recipe.author)
    recipes!: Recipe[];

    /**
     * Likes given by the user
     */
    @OneToMany(() => Like, like => like.user)
    likes!: Like[];

    /**
     * Comments made by the user
     */
    @OneToMany(() => Comment, comment => comment.user)
    comments!: Comment[];

    /**
     * Users that this user is subscribed to
     */
    @OneToMany(() => Subscription, sub => sub.subscriber)
    subscriptions!: Subscription[];

    /**
     * Users that are subscribed to this user
     */
    @OneToMany(() => Subscription, sub => sub.creator)
    subscribers!: Subscription[];
}
