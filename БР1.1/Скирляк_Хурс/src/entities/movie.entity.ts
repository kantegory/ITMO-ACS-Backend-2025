import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Genre } from './genre.entity';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tmdb_id: number;

  @Column()
  title: string;

  @Column('text')
  overview: string;

  @Column()
  release_date: Date;

  @Column('decimal', { precision: 3, scale: 1 })
  vote_average: number;

  @Column()
  poster_path: string;

  @Column()
  backdrop_path: string;

  @ManyToMany(() => Genre, { cascade: true })
  @JoinTable({
    name: 'movie_genres',
    joinColumn: { name: 'movie_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'genre_id', referencedColumnName: 'id' },
  })
  genres: Genre[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
