import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './models/user.entity';
import { UserModule } from './routes/user.module';
import { AuthModule } from './routes/auth.module';
import { ChatModule } from './routes/chat.module';
import { MessageModule } from './routes/message.module';
import { AppointmentModule } from './routes/appointment.module';
import { ReviewModule } from './routes/review.module';
import { PsychologistModule } from './routes/psychologist.module';
import { SpecializationModule } from './routes/specialization.module';
import { ScheduleModule } from './routes/schedule.module';

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
    AuthModule,
    ChatModule,
    MessageModule,
    ScheduleModule,
    ReviewModule,
    AppointmentModule,
    PsychologistModule,
    SpecializationModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
