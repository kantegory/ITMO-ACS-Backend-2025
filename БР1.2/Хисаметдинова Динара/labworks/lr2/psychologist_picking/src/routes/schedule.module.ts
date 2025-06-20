import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from '../models/schedule.entity';
import { Psychologist } from '../models/psychologist.entity';
import { ScheduleService } from '../services/schedule.service';
import { ScheduleController } from '../controllers/schedule.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Psychologist])],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
