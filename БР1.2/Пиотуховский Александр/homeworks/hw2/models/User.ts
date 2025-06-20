import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Role } from './Role';
import { Post } from './Post';
import { Recipe } from './Recipe';
import { Follower } from './Follower';
import { PostFavorite } from './PostFavorite';
import { RecipeFavorite } from './RecipeFavorite';
import { Comment } from './Comment';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    email: string;

    @ManyToOne(() => Role, role => role.users, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @Column({ type: 'boolean', name: 'is_muted', default: false })
    isMuted: boolean;

    @Column({ type: 'boolean', name: 'is_active', default: true })
    isActive: boolean;

    @Column({ type: 'varchar', length: 30, nullable: true, name: 'first_name' })
    firstName: string;

    @Column({ type: 'varchar', length: 30, nullable: true, name: 'last_name' })
    lastName: string;

    @Column({ type: 'varchar', length: 50, nullable: true, name: 'photo_url' })
    photoUrl: string;

    @CreateDateColumn({ name: 'registered_at' })
    registeredAt: Date;

    @Column({ type: 'text' })
    password: string;

    @Column({ type: 'timestamp', name: 'password_updated_at', nullable: true })
    passwordUpdatedAt: Date;

    @OneToMany(() => Follower, follower => follower.user)
    followers: Follower[];

    @OneToMany(() => Follower, follower => follower.follower)
    following: Follower[];

    @OneToMany(() => Post, post => post.author)
    posts: Post[];

    @OneToMany(() => Recipe, recipe => recipe.author)
    recipes: Recipe[];

    @OneToMany(() => PostFavorite, fav => fav.user)
    postFavorites: PostFavorite[];

    @OneToMany(() => RecipeFavorite, fav => fav.user)
    recipeFavorites: RecipeFavorite[];

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[];
}