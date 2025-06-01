import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { File } from "./File";

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    article_id!: number;

    @ManyToOne(() => User, user => user.articles)
    user!: User;

    @Column("varchar")
    title!: string;

    @Column("text")
    content!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at!: Date;

    @OneToMany(() => File, file => file.article)
    files!: File[];
}
