import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './Role';
import { Recipe } from './Recipe';
import { Comment } from './Comment';
import { Like } from './Like';
import { SavedRecipe } from './SavedRecipe';
import { Subscription } from './Subscription';

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - first_name
 *         - last_name
 *         - created_at
 *         - role
 *       properties:
 *         id:
 *           type: integer
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         profile_picture:
 *           type: string
 *         phone_number:
 *           type: string
 *         gender:
 *           type: string
 *           enum: [м, ж]
 *         bio:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         role:
 *           $ref: '#/components/schemas/Role'
 *         recipes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Recipe'
 *         comments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Comment'
 *         likes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Like'
 *         savedRecipes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SavedRecipe'
 *         followingSubscriptions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Subscription'
 *         followerSubscriptions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Subscription'
 */
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    password: string;

    @ManyToOne(() => Role, (role) => role.users, { nullable: false, onDelete: 'RESTRICT' })
    role: Role;

    @Column({ type: 'varchar', length: 127, nullable: false })
    first_name: string;

    @Column({ type: 'varchar', length: 127, nullable: false })
    last_name: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    profile_picture: string;

    @Column({ type: 'varchar', length: 31, nullable: true })
    phone_number: string;

    @Column({ type: 'enum', enum: ['м', 'ж'], nullable: true })
    gender: string;

    @Column({ type: 'text', nullable: true })
    bio: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @OneToMany(() => Recipe, (recipe) => recipe.user)
    recipes: Recipe[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];

    @OneToMany(() => Like, (like) => like.user)
    likes: Like[];

    @OneToMany(() => SavedRecipe, (savedRecipe) => savedRecipe.user)
    savedRecipes: SavedRecipe[];

    @OneToMany(() => Subscription, (subscription) => subscription.follower)
    followingSubscriptions: Subscription[];

    @OneToMany(() => Subscription, (subscription) => subscription.following)
    followerSubscriptions: Subscription[];
}
