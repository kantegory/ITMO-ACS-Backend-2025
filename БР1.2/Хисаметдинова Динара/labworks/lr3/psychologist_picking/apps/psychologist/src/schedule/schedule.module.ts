import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from '../schedule/schedule.entity';
import { Psychologist } from '../psychologist/psychologist.entity';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Psychologist])],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
