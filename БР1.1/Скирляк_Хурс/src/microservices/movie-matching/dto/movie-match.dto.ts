import {
  IsString,
  IsNumber,
  IsUUID,
  IsObject,
  IsOptional,
  ValidateNested,
  IsArray,
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

export class CreateSessionDto {
  @ApiProperty({ description: 'UUID of the first user' })
  @IsUUID()
  user1_id: string;

  @ApiProperty({ description: 'UUID of the second user' })
  @IsUUID()
  user2_id: string;
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

export class MovieQueueDto {
  @ApiProperty({
    description: 'Array of TMDb movie IDs to add to the session queue',
    type: [Number],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  movieIds: number[];
}
