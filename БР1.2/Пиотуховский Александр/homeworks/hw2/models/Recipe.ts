import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm';
import { User } from './User';
import { DishType } from './DishType';
import { RecipeFavorite } from './RecipeFavorite';
import { RecipeBlock } from './RecipeBlock';
import { RecipeIngredient } from './RecipeIngredient';
import { PostToRecipe } from './PostToRecipe';
import { Comment } from './Comment';

@Entity('recipes')
export class Recipe {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.recipes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'author_id' })
    author: User;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', nullable: true })
    updatedAt: Date;

    @Column({ type: 'varchar', length: 100 })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @ManyToOne(() => DishType, dishType => dishType.recipes)
    @JoinColumn({ name: 'dish_type' })
    dishType: DishType;

    @Column({ type: 'int' })
    difficulty: number;

    @OneToMany(() => RecipeFavorite, fav => fav.recipe)
    favorites: RecipeFavorite[];

    @OneToMany(() => RecipeBlock, block => block.recipe)
    blocks: RecipeBlock[];

    @OneToMany(() => RecipeIngredient, ri => ri.recipe)
    ingredients: RecipeIngredient[];

    @OneToMany(() => PostToRecipe, ptr => ptr.recipe)
    postRecipes: PostToRecipe[];

    @OneToMany(() => Comment, comment => comment.recipe)
    comments: Comment[];
}