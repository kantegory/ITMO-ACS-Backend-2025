import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Theme } from '../enums/Theme';

@Entity()
export class BlogPost {
  @PrimaryGeneratedColumn()
  post_id!: number;

  @Column()
  author!: string;

  @Column()
  title!: string;

  @Column({
    type: 'enum',
    enum: Theme,
    nullable: false
  })
  theme!: Theme;

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  publication_date!: Date;
}