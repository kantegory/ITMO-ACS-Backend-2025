import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { DishType } from './DishType';
import { RecipeDifficulty } from './RecipeDifficulty';
import { RecipeStep } from './RecipeStep';
import { Comment } from './Comment';
import { Like } from './Like';
import { SavedRecipe } from './SavedRecipe';
import { RecipeIngredient } from './RecipeIngredient';

/**
 * @openapi
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       required:
 *         - id
 *         - user
 *         - dishType
 *         - recipeDifficulty
 *         - title
 *         - preparation_time
 *         - cooking_time
 *         - servings
 *         - created_at
 *         - updated_at
 *       properties:
 *         id:
 *           type: integer
 *         user:
 *           $ref: '#/components/schemas/User'
 *         dishType:
 *           $ref: '#/components/schemas/DishType'
 *         recipeDifficulty:
 *           $ref: '#/components/schemas/RecipeDifficulty'
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         preparation_time:
 *           type: integer
 *         cooking_time:
 *           type: integer
 *         servings:
 *           type: integer
 *         image:
 *           type: string
 *         video:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         steps:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RecipeStep'
 *         comments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Comment'
 *         likes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Like'
 *         savedBy:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SavedRecipe'
 *         recipeIngredients:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RecipeIngredient'
 */
@Entity()
export class Recipe {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.recipes, { nullable: false, onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => DishType, (dishType) => dishType.recipes, { nullable: false })
    dishType: DishType;

    @ManyToOne(() => RecipeDifficulty, (difficulty) => difficulty.recipes, { nullable: false })
    recipeDifficulty: RecipeDifficulty;

    @Column({ type: 'varchar', length: 255, nullable: false })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'int', nullable: false })
    preparation_time: number;

    @Column({ type: 'int', nullable: false })
    cooking_time: number;

    @Column({ type: 'int', nullable: false })
    servings: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    image: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    video: string;

    @CreateDateColumn({ name: 'created_at', nullable: false })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at', nullable: false })
    updated_at: Date;

    @OneToMany(() => RecipeStep, (step) => step.recipe)
    steps: RecipeStep[];

    @OneToMany(() => Comment, (comment) => comment.recipe, { nullable: true })
    comments: Comment[];

    @OneToMany(() => Like, (like) => like.recipe)
    likes: Like[];

    @OneToMany(() => SavedRecipe, (savedRecipe) => savedRecipe.recipe)
    savedBy: SavedRecipe[];

    @OneToMany(() => RecipeIngredient, (recipeIngredient) => recipeIngredient.recipe)
    recipeIngredients: RecipeIngredient[];
}
