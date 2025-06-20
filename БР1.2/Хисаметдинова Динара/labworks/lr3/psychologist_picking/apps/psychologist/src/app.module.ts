import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Psychologist } from './psychologist/psychologist.entity';
import { Specialization } from './specialization/specialization.entity';
import { PsychologistSpecialization } from './specialization/psychologist_specialization.entity';
import { Schedule } from './schedule/schedule.entity';

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
        entities: [
          Psychologist,
          Specialization,
          PsychologistSpecialization,
          Schedule,
        ],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([
      Psychologist,
      Specialization,
      PsychologistSpecialization,
      Schedule,
    ]),
  ],
})
export class AppModule {}
