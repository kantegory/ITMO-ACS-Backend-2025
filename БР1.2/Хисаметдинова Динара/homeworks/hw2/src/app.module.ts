import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './models/user.entity';
import { UserModule } from './routes/user.module';
import { AppointmentModule } from './routes/appointment.module';
import { PsychologistModule } from './routes/psychologist.module';

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
        entities: [__dirname + '/models/*.entity.{ts,js}'],
        synchronize: true,
        logging: true,
      }),
    }),

    UserModule,
    AppointmentModule,
    PsychologistModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
