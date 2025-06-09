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
    @Column({ type: "varchar"})
    name!: string;

    @Column({ type: "varchar", unique: true })
    email!: string;

    @Column({ type: "varchar", select: false })
    password!: string;


    @OneToMany(() => Recipe, recipe => recipe.author)
    recipes!: Recipe[];

    @OneToMany(() => Like, like => like.user)
    likes!: Like[];

    @OneToMany(() => Comment, comment => comment.user)
    comments!: Comment[];

    @OneToMany(() => Subscription, sub => sub.subscriber)
    subscriptions!: Subscription[];

    @OneToMany(() => Subscription, sub => sub.creator)
    subscribers!: Subscription[];
}
