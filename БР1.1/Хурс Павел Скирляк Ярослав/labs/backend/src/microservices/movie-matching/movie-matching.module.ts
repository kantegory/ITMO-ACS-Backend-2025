import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

import databaseConfig from '../../config/database.config';
import redisConfig from '../../config/redis.config';
import rabbitmqConfig from '../../config/rabbitmq.config';
import { RedisModule } from '../redis/redis.module';

import { MovieMatch } from '../../entities/movie-match.entity';
import { MovieMatchingService } from './movie-matching.service';
import { MovieMatchingController } from './movie-matching.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, redisConfig, rabbitmqConfig],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => cs.get('database'),
    }),

    TypeOrmModule.forFeature([MovieMatch]),
    RedisModule,

    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (cs: ConfigService) => {
          const rmq = cs.get<{ uri: string; queues: Record<string, string> }>(
            'rabbitmq',
          );
          return {
            transport: Transport.RMQ,
            options: {
              urls: [rmq.uri],
              queue: rmq.queues.userService,
              queueOptions: { durable: true },
            },
          };
        },
      },
      {
        name: 'AUTH_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (cs: ConfigService) => {
          const rmq = cs.get<{ uri: string; queues: Record<string, string> }>(
            'rabbitmq',
          );
          return {
            transport: Transport.RMQ,
            options: {
              urls: [rmq.uri],
              queue: rmq.queues.authService,
              queueOptions: { durable: true },
            },
          };
        },
      },
    ]),
  ],
  controllers: [MovieMatchingController],
  providers: [MovieMatchingService],
})
export class MovieMatchingModule {}
