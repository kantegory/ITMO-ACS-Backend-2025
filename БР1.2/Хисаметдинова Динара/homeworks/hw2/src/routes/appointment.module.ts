import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from '../models/appointment.entity';
import { User } from '../models/user.entity';
import { Psychologist } from '../models/psychologist.entity';
import { AppointmentService } from '../services/appointment.service';
import { AppointmentController } from '../controllers/appointment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, User, Psychologist])],
  providers: [AppointmentService],
  controllers: [AppointmentController],
})
export class AppointmentModule {}
