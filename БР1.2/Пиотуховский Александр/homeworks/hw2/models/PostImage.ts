import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    JoinColumn,
} from 'typeorm';
import { Post } from './Post';

@Entity('post_images')
export class PostImage {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Post, post => post.images, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_id' })
    post: Post;

    @Column({ type: 'text', name: 'image_url' })
    imageUrl: string;

    @Column({ type: 'int', default: 0, name: 'display_order' })
    displayOrder: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}