import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    Unique,
    JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Recipe } from './Recipe';

@Entity('recipe_favorites')
@Unique(['user', 'recipe'])
export class RecipeFavorite {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.recipeFavorites, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Recipe, recipe => recipe.favorites, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'recipe_id' })
    recipe: Recipe;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}