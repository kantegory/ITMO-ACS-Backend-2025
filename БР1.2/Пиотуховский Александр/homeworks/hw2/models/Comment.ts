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
import { Post } from './Post';
import { Recipe } from './Recipe';
import { CommentableTypeEnum } from './enums';

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: CommentableTypeEnum, name: 'commentable_type' })
    commentableType: CommentableTypeEnum;

    @Column({ type: 'bigint', name: 'commentable_id' })
    commentableId: number;

    @ManyToOne(() => User, user => user.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Comment, comment => comment.children, { onDelete: 'CASCADE', nullable: true })
    @JoinColumn({ name: 'parent_id' })
    parent: Comment;

    @OneToMany(() => Comment, comment => comment.parent)
    children: Comment[];

    @Column({ type: 'text' })
    content: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', nullable: true })
    updatedAt: Date;

    @ManyToOne(() => Post, post => post.comments, {
        nullable: true,
        createForeignKeyConstraints: false,
    })
    @JoinColumn({ name: 'commentable_id' })
    post?: Post;

    @ManyToOne(() => Recipe, recipe => recipe.comments, {
        nullable: true,
        createForeignKeyConstraints: false,
    })
    @JoinColumn({ name: 'commentable_id' })
    recipe?: Recipe;
}
