import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { DishType } from './DishType';
import { RecipeDifficulty } from './RecipeDifficulty';
import { RecipeStep } from './RecipeStep';
import { RecipeIngredient } from './RecipeIngredient';

/**
 * @openapi
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       required:
 *         - id
 *         - userId
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
 *         userId:
 *           type: integer
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
 *         recipeIngredients:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RecipeIngredient'
 */
@Entity()
export class Recipe {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: false })
    userId: number;

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

    @OneToMany(() => RecipeIngredient, (recipeIngredient) => recipeIngredient.recipe)
    recipeIngredients: RecipeIngredient[];
}
