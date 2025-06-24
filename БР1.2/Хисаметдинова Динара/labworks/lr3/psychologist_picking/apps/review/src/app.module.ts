import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Review } from './review.entity';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [Review],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Review]),
    ClientsModule.register([
      {
        name: 'USERS_AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672'],
          queue: 'users_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class AppModule {}
