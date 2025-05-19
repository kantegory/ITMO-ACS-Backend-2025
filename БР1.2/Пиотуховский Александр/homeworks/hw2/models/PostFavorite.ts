import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    Unique,
    JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Post } from './Post';

@Entity('post_favorites')
@Unique(['user', 'post'])
export class PostFavorite {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.postFavorites, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Post, post => post.favorites, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_id' })
    post: Post;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}