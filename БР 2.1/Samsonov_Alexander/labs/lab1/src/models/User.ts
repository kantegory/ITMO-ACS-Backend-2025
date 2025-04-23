import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Recipe} from "./Recipe";
import {Like} from "./Like";
import {Comment} from "./Comment";
import {Subscription} from "./Subscribtion";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({unique: true})
    email!: string;

    @Column({ select: false })
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
