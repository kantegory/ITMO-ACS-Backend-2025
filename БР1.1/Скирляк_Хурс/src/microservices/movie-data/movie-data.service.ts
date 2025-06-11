import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Movie } from '../../entities/movie.entity';
import { Genre } from '../../entities/genre.entity';
import { firstValueFrom } from 'rxjs';

interface TMDBGenreResponse {
  genres: Array<{ id: number; name: string }>;
}

interface TMDBMovieResponse {
  results: Array<{
    id: number;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
    poster_path: string;
    backdrop_path: string;
    genre_ids: number[];
  }>;
}

interface TMDBMovieDetailsResponse {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  genres: Array<{ id: number }>;
}

@Injectable()
export class MovieDataService {
  private readonly logger = new Logger(MovieDataService.name);

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async syncGenres(): Promise<Genre[]> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<TMDBGenreResponse>('/genre/movie/list'),
      );

      const genres = await Promise.all(
        data.genres.map(async genre => {
          const existingGenre = await this.genreRepository.findOne({
            where: { tmdb_id: genre.id },
          });

          if (existingGenre) {
            return existingGenre;
          }

          return this.genreRepository.save({
            tmdb_id: genre.id,
            name: genre.name,
          });
        }),
      );

      return genres;
    } catch (error) {
      this.logger.error('Failed to sync genres', error);
      throw error;
    }
  }

  async searchMovies(query: string): Promise<Movie[]> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<TMDBMovieResponse>('/search/movie', {
          params: { query },
        }),
      );

      const movies = await Promise.all(
        data.results.map(async movie => {
          const existingMovie = await this.movieRepository.findOne({
            where: { tmdb_id: movie.id },
            relations: ['genres'],
          });

          if (existingMovie) {
            return existingMovie;
          }

          const genres = await this.genreRepository.findBy({
            tmdb_id: In(movie.genre_ids),
          });

          return this.movieRepository.save({
            tmdb_id: movie.id,
            title: movie.title,
            overview: movie.overview,
            release_date: new Date(movie.release_date),
            vote_average: movie.vote_average,
            poster_path: movie.poster_path,
            backdrop_path: movie.backdrop_path,
            genres,
          });
        }),
      );

      return movies;
    } catch (error) {
      this.logger.error('Failed to search movies', error);
      throw error;
    }
  }

  async getMovieDetails(tmdbId: number): Promise<Movie> {
    try {
      const existingMovie = await this.movieRepository.findOne({
        where: { tmdb_id: tmdbId },
        relations: ['genres'],
      });

      if (existingMovie) {
        return existingMovie;
      }

      const { data } = await firstValueFrom(
        this.httpService.get<TMDBMovieDetailsResponse>(`/movie/${tmdbId}`),
      );

      const genres = await this.genreRepository.findBy({
        tmdb_id: In(data.genres.map(g => g.id)),
      });
      console.log('Genres found:', data, genres);
      return this.movieRepository.save({
        tmdb_id: data.id,
        title: data.title,
        overview: data.overview,
        release_date: new Date(data.release_date),
        vote_average: data.vote_average,
        poster_path: data.poster_path,
        backdrop_path: data.backdrop_path,
        genres,
      });
    } catch (error) {
      this.logger.error(`Failed to get movie details for ID ${tmdbId}`, error);
      throw error;
    }
  }

  async getPopularMovies(): Promise<Movie[]> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<TMDBMovieResponse>('/movie/popular'),
      );

      const movies = await Promise.all(
        data.results.map(async movie => {
          const existingMovie = await this.movieRepository.findOne({
            where: { tmdb_id: movie.id },
            relations: ['genres'],
          });

          if (existingMovie) {
            return existingMovie;
          }

          const genres = await this.genreRepository.findBy({
            tmdb_id: In(movie.genre_ids),
          });

          return this.movieRepository.save({
            tmdb_id: movie.id,
            title: movie.title,
            overview: movie.overview,
            release_date: new Date(movie.release_date),
            vote_average: movie.vote_average,
            poster_path: movie.poster_path,
            backdrop_path: movie.backdrop_path,
            genres,
          });
        }),
      );

      return movies;
    } catch (error) {
      this.logger.error('Failed to get popular movies', error);
      throw error;
    }
  }
}
