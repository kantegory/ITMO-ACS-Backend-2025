import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import databaseConfig from '../../config/database.config';
import redisConfig from '../../config/redis.config';
import rabbitmqConfig from '../../config/rabbitmq.config';
import authConfig from '../../config/auth.config';
import { MovieDataService } from './movie-data.service';
import { MovieDataController } from './movie-data.controller';

import { Movie } from '../../entities/movie.entity';
import { Genre } from '../../entities/genre.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, redisConfig, rabbitmqConfig, authConfig],
    }),

    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        baseURL: 'https://api.themoviedb.org/3',
        headers: {
          Authorization: `Bearer ${cs.get<string>('TMDB_ACCESS_TOKEN')}`,
        },
      }),
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => cs.get('database'),
    }),

    TypeOrmModule.forFeature([Movie, Genre]),
  ],
  controllers: [MovieDataController],
  providers: [MovieDataService],
})
export class MovieDataModule {}
