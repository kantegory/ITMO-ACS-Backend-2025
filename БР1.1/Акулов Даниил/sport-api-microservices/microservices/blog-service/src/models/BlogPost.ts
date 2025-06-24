import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn} from 'typeorm';

@Entity('blog_posts')
export class BlogPost {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 256 })
    title: string;

    @Column({ type: 'text' })
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    authorId: number;
}
