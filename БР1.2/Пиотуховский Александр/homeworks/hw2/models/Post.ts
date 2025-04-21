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
import { PostImage } from './PostImage';
import { PostFavorite } from './PostFavorite';
import { PostToRecipe } from './PostToRecipe';
import { Comment } from './Comment';

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.posts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'author_id' })
    author: User;

    @Column({ type: 'varchar', length: 100 })
    title: string;

    @Column({ type: 'text' })
    content: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', nullable: true })
    updatedAt: Date;

    @OneToMany(() => PostImage, image => image.post)
    images: PostImage[];

    @OneToMany(() => PostFavorite, fav => fav.post)
    favorites: PostFavorite[];

    @OneToMany(() => PostToRecipe, ptr => ptr.post)
    postRecipes: PostToRecipe[];

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];
}