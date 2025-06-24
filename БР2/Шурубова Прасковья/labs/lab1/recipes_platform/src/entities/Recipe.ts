import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable} from "typeorm";
import { User } from "./User";
import { File } from "./File";
import { Category } from "./Category";
import { Comment } from "./Comment";
import { Favourite } from "./Favourite";
import { Rating } from "./Rating";
import { Collection } from "./Collection";

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn()
    recipe_id!: number;

    @ManyToOne(() => User, user => user.recipes)
    user!: User;

    @Column("varchar")
    title!: string;

    @Column("text")
    description!: string;

    @Column("text")
    ingredients!: string;

    @Column("text")
    instructions!: string;

    @Column("varchar")
    difficulty_level!: string;

    @Column("int")
    preparation_time!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at!: Date;

    @OneToMany(() => File, file => file.recipe)
    files!: File[];

    @OneToMany(() => Category, category => category.recipe)
    categories!: Category[];

    @OneToMany(() => Comment, comment => comment.recipe)
    comments!: Comment[];

    @OneToMany(() => Favourite, favourite => favourite.recipe)
    favourites!: Favourite[];

    @OneToMany(() => Rating, rating => rating.recipe)
    ratings!: Rating[];

    @ManyToMany(() => Collection, collection => collection.recipes)
    @JoinTable()
    collections!: Collection[];
}
