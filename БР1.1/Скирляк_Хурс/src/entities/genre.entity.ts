import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Movie } from './movie.entity';

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tmdb_id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Movie, movie => movie.genres)
  movies: Movie[];
}
