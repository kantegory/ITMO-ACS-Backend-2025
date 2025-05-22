import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class BlogPost {
  @PrimaryGeneratedColumn()
  post_id!: number;

  @Column()
  author!: string;

  @Column()
  title!: string;

  @Column()
  theme!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  publication_date!: Date;
}