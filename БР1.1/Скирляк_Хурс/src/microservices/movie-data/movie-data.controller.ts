import { Controller, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MovieDataService } from './movie-data.service';
import { Movie } from '../../entities/movie.entity';
import { Genre } from '../../entities/genre.entity';
import { MessagePattern } from '@nestjs/microservices';

@ApiTags('movie-data')
@Controller('movie-data')
export class MovieDataController {
  constructor(private readonly movieDataService: MovieDataService) {}

  @Get('genres/sync')
  @ApiOperation({ summary: 'Sync genres from TMDB' })
  @ApiResponse({ status: 200, type: [Genre] })
  async syncGenres(): Promise<Genre[]> {
    return this.movieDataService.syncGenres();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search movies by query' })
  @ApiResponse({ status: 200, type: [Movie] })
  async searchMovies(@Query('query') query: string): Promise<Movie[]> {
    return this.movieDataService.searchMovies(query);
  }

  @Get('movie/:id')
  @ApiOperation({ summary: 'Get movie details by TMDB ID' })
  @ApiResponse({ status: 200, type: Movie })
  async getMovieDetails(
    @Param('id', ParseIntPipe) tmdbId: number,
  ): Promise<Movie> {
    return this.movieDataService.getMovieDetails(tmdbId);
  }

  @Get('popular')
  @ApiOperation({ summary: 'Get popular movies' })
  @ApiResponse({ status: 200, type: [Movie] })
  async getPopularMovies(): Promise<Movie[]> {
    return this.movieDataService.getPopularMovies();
  }

  @MessagePattern('get_movie_details')
  async handleGetMovieDetails(tmdbId: number): Promise<Movie> {
    return this.movieDataService.getMovieDetails(tmdbId);
  }

  @MessagePattern('search_movies')
  async handleSearchMovies(query: string): Promise<Movie[]> {
    return this.movieDataService.searchMovies(query);
  }
}
