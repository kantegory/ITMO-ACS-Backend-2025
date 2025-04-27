import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
    UpdateDateColumn, OneToMany
} from "typeorm";
import {User} from "./User";
import {Tag} from "./Tag";
import {Like} from "./Like";
import {Comment} from "./Comment";

export type RecipeContentBlock =
    | { type: "text"; content: string }
    | { type: "image"; url: string; alt?: string };


export type Ingredient = {
    name: string;
    quantity: string;
}

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column("text")
    description!: string;

    @Column("jsonb")
    ingredients!: Ingredient[];

    @Column("jsonb")
    content!: RecipeContentBlock[];

    @ManyToOne(() => User, user => user.recipes)
    author!: User;

    @ManyToMany(() => Tag, tag => tag.recipes, {cascade: true})
    @JoinTable()
    tags!: Tag[];

    @OneToMany(() => Like, like => like.recipe)
    likes!: Like[];


    @OneToMany(() => Comment, comment => comment.recipe)
    comments!: Comment[];


    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
