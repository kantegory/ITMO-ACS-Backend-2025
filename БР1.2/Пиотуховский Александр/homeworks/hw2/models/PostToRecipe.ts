import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, JoinColumn } from 'typeorm';
import { Post } from './Post';
import { Recipe } from './Recipe';

@Entity('post_to_recipes')
@Unique(['post', 'recipe'])
export class PostToRecipe {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Post, post => post.postRecipes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_id' })
    post: Post;

    @ManyToOne(() => Recipe, recipe => recipe.postRecipes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'recipe_id' })
    recipe: Recipe;

    @Column({ type: 'int', default: 0, name: 'display_order' })
    displayOrder: number;
}