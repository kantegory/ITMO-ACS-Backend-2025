import {
  IsString,
  IsNumber,
  IsUUID,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MovieDetailsDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  poster_path: string;

  @ApiProperty()
  @IsString()
  release_date: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  overview?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  vote_average?: number;
}

export class CreateMovieMatchDto {
  @ApiProperty()
  @IsUUID()
  user1_id: string;

  @ApiProperty()
  @IsUUID()
  user2_id: string;

  @ApiProperty()
  @IsNumber()
  tmdb_movie_id: number;

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  movie_details?: {
    title: string;
    poster_path: string;
    release_date: string;
  };
}

export class MoviePreferenceDto {
  @ApiProperty({ description: 'UUID of the user making the preference' })
  @IsUUID()
  userId: string;

  @ApiProperty({ description: 'TMDb movie ID' })
  @IsNumber()
  movieId: number;

  @ApiPropertyOptional({ description: 'Additional movie details to store' })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => MovieDetailsDto)
  movieDetails?: MovieDetailsDto;
}

export class CreateSessionDto {
  @ApiProperty({ description: 'UUID of the first user' })
  @IsUUID()
  user1_id: string;

  @ApiProperty({ description: 'UUID of the second user' })
  @IsUUID()
  user2_id: string;
}

export class MovieQueueDto {
  @ApiProperty({
    description: 'Array of TMDb movie IDs to add to the session queue',
    type: [Number],
  })
  @IsNumber({}, { each: true })
  movieIds: number[];
}
